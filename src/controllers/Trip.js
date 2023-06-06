import Trip from "../models/allModels/TripModel.js";
import processFile from '../middleware/ProcessFile.js';
import { format } from 'util';
import gcs from '../config/gcs.js';
import model from '../models/index.js';

const storage = gcs;
const bucketName = 'tourista-test.appspot.com';
const bucket = storage.bucket(bucketName);

export const getTripById = async (req, res) => {
    const tripId = req.params.id;

    try {
        const trip = await Trip.findByPk(tripId);

        if (!trip) {
            return res.status(404).json({ msg: "Trip not found" });
        }

        res.json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createTrip = async (req, res) => {
    const { trip_name, trip_detail, use_lodging } = req.body;

    try {
        const trip = await Trip.create({
            trip_name,
            trip_detail,
            use_lodging,
        });

        res.json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateTrip = async (req, res) => {
    const { trip_name, trip_detail, use_lodging } = req.body;
    const tripId = req.params.id;

    try {
        const trip = await Trip.findByPk(tripId);

        if (!trip) {
            return res.status(404).json({ msg: "Trip not found" });
        }

        await trip.update({
            trip_name,
            trip_detail,
            use_lodging,
        });

        res.json({ msg: "Trip updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteTrip = async (req, res) => {
    const tripId = req.params.id;

    try {
        const trip = await Trip.findByPk(tripId);

        if (!trip) {
            return res.status(404).json({ msg: "Trip not found" });
        }

        await trip.destroy();
        res.json({ msg: "Trip deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const uploadTripImage = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const bucket = storage.bucket(bucketName);
    const folderName = 'trip_image'; // Nama folder di GCS
    const fileName = `trip_${id}_${file.originalname}`;
    const filePath = `${folderName}/${fileName}`; // Path file di GCS
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
      
      // Update URL file di tabel trip
      try {
        const trip = await Trip.findByPk(id);
        if (trip) {
          await trip.update({ trip_image: publicUrl });
          return res.status(200).json({ 
            message: 'File uploaded and trip image updated successfully',
            fileUrl: publicUrl 
          });
        }
        return res.status(404).json({ message: 'Trip not found' });
      } catch (error) {
        console.log('Error updating trip image:', error);
        return res.status(500).json({ error: 'Error updating trip image' });
      }
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.log('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file' });
  }
};


  
