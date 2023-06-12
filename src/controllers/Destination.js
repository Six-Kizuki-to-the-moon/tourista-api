import Destination from "../models/allModels/DestinationModel.js";
import gcs from '../config/gcs.js';

const storage = gcs;
const bucketName = 'tourista_bucket';

export const getDestinationById = async (req, res) => {
  const destinationId = req.params.id;

  try {
    const destination = await Destination.findByPk(destinationId);

    if (!destination) {
      return res.status(404).json({ msg: "Destination not found" });
    }

    res.json(destination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllDestination = async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      order: [['rating', 'DESC']],
    });

    res.json(destinations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const createDestination = async (req, res) => {
  const { name_wisata, description_wisata, category, city, price, rating, time_minutes, coordinate, destination_lat, destination_long } = req.body;

  try {
    const destination = await Destination.create({
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

    res.json(destination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateDestination = async (req, res) => {
  const { name_wisata, description_wisata, category, city, price, rating, time_minutes, coordinate, destination_lat, destination_long } = req.body;
  const destinationId = req.params.id;

  try {
    const destination = await Destination.findByPk(destinationId);

    if (!destination) {
      return res.status(404).json({ msg: "Destination not found" });
    }

    await destination.update({
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

    res.json({ msg: "Destination updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteDestination = async (req, res) => {
  const destinationId = req.params.id;

  try {
    const destination = await Destination.findByPk(destinationId);

    if (!destination) {
      return res.status(404).json({ msg: "Destination not found" });
    }

    await destination.destroy();
    res.json({ msg: "Destination deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const uploadDestinationImage = async (req, res) => {
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
        const destination = await Destination.findByPk(id);
        if (destination) {
          await destination.update({ destination_photo: publicUrl });
          return res.status(200).json({
            message: 'File uploaded and destination image updated successfully',
            fileUrl: publicUrl
          });
        }
        return res.status(404).json({ message: 'Destination not found' });
      } catch (error) {
        console.log('Error updating destination image:', error);
        return res.status(500).json({ error: 'Error updating destination image' });
      }
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.log('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file' });
  }
};
