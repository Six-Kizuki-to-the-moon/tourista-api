import DestinationDetail from "../models/allModels/DestinationDetailModel.js";
import gcs from '../config/gcs.js';
import DestinationWisata from "../models/allModels/DestinationWisataModel.js";

const storage = gcs;
const bucketName = 'tourista-test.appspot.com';

export const getDestinationDetailById = async (req, res) => {
  const destinationDetailId = req.params.id;

  try {
    const destinationDetail = await DestinationDetail.findByPk(destinationDetailId, {
      include: [
        {
          model: DestinationWisata,
          attributes: ['name_wisata'],
        },
      ],
    });

    if (!destinationDetail) {
      return res.status(404).json({ msg: "Destination Detail not found" });
    }

    res.json(destinationDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createDestinationDetail = async (req, res) => {
  const { name_wisata, description_wisata, category, city, price, rating, time_minutes, coordinate, destination_lat, destination_long } = req.body;

  try {
    const destinationDetail = await DestinationDetail.create({
      name_wisata,
      description_wisata,
      category,
      city,
      price,
      rating,
      time_minutes,
      coordinate,
      destination_lat,
      destination_long,
    });

    res.json(destinationDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateDestinationDetail = async (req, res) => {
  const { name_wisata, description_wisata, category, city, price, rating, time_minutes, coordinate, destination_lat, destination_long } = req.body;
  const destinationDetailId = req.params.id;

  try {
    const destinationDetail = await DestinationDetail.findByPk(destinationDetailId);

    if (!destinationDetail) {
      return res.status(404).json({ msg: "Destination Detail not found" });
    }

    await destinationDetail.update({
    //   name_wisata,
      description_wisata,
      category,
      city,
      price,
      rating,
      time_minutes,
      coordinate,
      destination_lat,
      destination_long,
    });

    res.json({ msg: "Destination Detail updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteDestinationDetail = async (req, res) => {
  const destinationDetailId = req.params.id;

  try {
    const destinationDetail = await DestinationDetail.findByPk(destinationDetailId);

    if (!destinationDetail) {
      return res.status(404).json({ msg: "Destination Detail not found" });
    }

    await destinationDetail.destroy();
    res.json({ msg: "Destination Detail deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const uploadDestinationDetailImage = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const bucket = storage.bucket(bucketName);
    const folderName = 'destination_detail_image';
    const fileName = `destination_detail_${id}_${file.originalname}`;
    const filePath = `${folderName}/${fileName}`;
    const fileOptions = {
      metadata: {
        contentType: file.mimetype
      },
      resumable: false
    };

    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream(fileOptions);

    blobStream.on('error', (error) => {
      console.log('Error uploading file:', error);
      return res.status(500).json({ error: 'Error uploading file' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;

      try {
        const destinationDetail = await DestinationDetail.findByPk(id);
        if (destinationDetail) {
          await destinationDetail.update({ destination_photo: publicUrl });
          return res.status(200).json({
            message: 'File uploaded and destination detail image updated successfully',
            fileUrl: publicUrl
          });
        }
        return res.status(404).json({ message: 'Destination Detail not found' });
      } catch (error) {
        console.log('Error updating destination detail image:', error);
        return res.status(500).json({ error: 'Error updating destination detail image' });
      }
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.log('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file' });
  }
};
