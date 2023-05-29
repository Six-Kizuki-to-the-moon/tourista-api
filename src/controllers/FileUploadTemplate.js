import processFile from '../middleware/ProcessFile.js';
import { format } from 'util';
import gcs from '../config/gcs.js';
import model from '../models/index.js';

const storage = gcs;
const bucketName = 'tourista-test.appspot.com';
const bucket = storage.bucket(bucketName);

export const uploadFile = async (req, res) => {
  const emailUser = req.email;
  try {
    await model.UserProfile.findOne({ //change with the model you want to insert the gcs file's link
      email: emailUser,
    });
    await processFile(req, res);
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      await model.UserProfile.update( //change with the model you want to insert the gcs file's link
        { photo_profile: publicUrl }, //change with the field you want to insert the gcs file's link
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