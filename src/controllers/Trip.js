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
    const { tripId } = req.params;
    const emailUser = req.email;
    try {
      // Check if the trip exists
      const trip = await Trip.findOne({
        where: { id: tripId },
      });
  
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      await processFile(req, res);
  
      // Generate a random string to make the file name unique.
      const randomString = Math.random().toString(36).substring(2, 15);
  
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(`trip_images/${randomString}${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
  
      blobStream.on('error', (err) => {
        res.status(500).send({ message: err.message });
      });
  
      blobStream.on('finish', async (data) => {
        // Create URL for direct file access via HTTP.
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        await trip.update({ trip_image: publicUrl });
  
        res.status(200).send({
          message: 'Trip image successfully updated',
          url: publicUrl,
        });
      });
  
      blobStream.end(req.file.buffer);
    } catch (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(500).send({
          message: 'File cannot be larger than 2MB!',
        });
      }
      res.status(500).send({
        message: `Unable to upload file: ${req.file.originalname}. ${err}`,
      });
    }
  };
  
