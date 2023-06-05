export const uploadFile = async (req, res) => {
  const emailUser = req.email;
  try {
    await model.UserProfile.findOne({
      email: emailUser,
    });
    await processFile(req, res);
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(`user_profile/${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      await model.UserProfile.update(
        { photo_profile: publicUrl },
        {
          where: {
            email: emailUser,
          },
        }
      );
      res.status(200).send({
        message: 'Your Profile Picture Successfully Updated : ' + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'Files cannot be larger than 2MB!',
      });
    }
    res.status(500).send({
      message: `Unable to upload file: ${req.file.originalname}. ${err}`,
    });
  }
};
