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
    await model.UserProfile.findOne({
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
      await model.UserProfile.update(
        { photo_profile: publicUrl },
        {
          where: {
            email: emailUser,
          },
        }
      );
      res.status(200).send({
        message: 'File berhasil diupload ' + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File tidak dapat lebih besar 5MB!',
      });
    }
    res.status(500).send({
      message: `Tidak dapat mengupload file: ${req.file.originalname}. ${err}`,
    });
  }
};