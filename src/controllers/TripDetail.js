import TripDetail from "../models/allModels/TripDetailModel.js";
import UserProfile from "../models/allModels/UserProfileModel.js";
import Trip from "../models/allModels/TripModel.js";
import { Destination } from "../models/allModels/DestinationModel.js";

export const getTripDetailById = async (req, res) => {
  const userId = req.params.id;

  try {
    const tripDetail = await TripDetail.findOne({
      where: {
        user_id: userId
      },
      include: [
        {
          model: UserProfile,
          attributes: ['name'],
        },
        {
          model: Trip,
          attributes: ['trip_name'],
        },
        {
          model: Destination,
          attributes: ['name_wisata'],
        },
      ],
    });

    if (!tripDetail) {
      return res.status(404).json({ msg: "Trip Detail not found" });
    }

    res.json(tripDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createTripDetail = async (req, res) => {
  const { user_id, trip_name_type, name_wisata, visited } = req.body;

  try {
    const tripDetail = await TripDetail.create({
      user_id,
      trip_name_type,
      name_wisata,
      visited,
    });

    res.json(tripDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateTripDetail = async (req, res) => {
  const { user_id, trip_name_type, name_wisata, visited } = req.body;
  const tripDetailId = req.params.id;

  try {
    const tripDetail = await TripDetail.findByPk(tripDetailId);

    if (!tripDetail) {
      return res.status(404).json({ msg: "Trip Detail not found" });
    }

    await tripDetail.update({
      user_id,
      trip_name_type,
      name_wisata,
      visited,
    });

    res.json({ msg: "Trip Detail updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteTripDetail = async (req, res) => {
  const tripDetailId = req.params.id;

  try {
    const tripDetail = await TripDetail.findByPk(tripDetailId);

    if (!tripDetail) {
      return res.status(404).json({ msg: "Trip Detail not found" });
    }

    await tripDetail.destroy();
    res.json({ msg: "Trip Detail deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
