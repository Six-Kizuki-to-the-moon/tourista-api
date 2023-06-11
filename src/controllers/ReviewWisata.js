import ReviewWisata from "../models/allModels/ReviewWisataModel.js";
import UserProfile from "../models/allModels/UserProfileModel.js";
import { Destination } from "../models/allModels/DestinationModel.js";

export const getAllReviewsByPlace = async (req, res) => {
    const wisataId = req.params.wisata_id;
    
    try {
      const reviews = await ReviewWisata.findAll({
        where: {
          wisata_id: wisataId
        },
        include: [
          {
            model: UserProfile,
            attributes: ['name'],
          },
          {
            model: Destination,
            attributes: ['name_wisata'],
          },
        ],
      });
  
      res.json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };

  export const getAllReviewsById = async (req, res) => {
    const userWisataId = req.params.user_wisata;
    
    try {
      const reviews = await ReviewWisata.findAll({
        where: {
          user_wisata: userWisataId
        },
        include: [
          {
            model: UserProfile,
            attributes: ['name'],
          },
          {
            model: Destination,
            attributes: ['name_wisata'],
          },
        ],
      });
  
      res.json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  

export const createReview = async (req, res) => {
  const { user_wisata, wisata_id, wisata_rating } = req.body;

  try {
    const review = await ReviewWisata.create({
      user_wisata,
      wisata_id,
      wisata_rating,
    });

    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  const { user_wisata, wisata_id, wisata_rating } = req.body;
  const userWisata = req.params.user_wisata;
  const wisataId = req.params.wisata_id;

  try {
    const review = await ReviewWisata.findOne({
        where: {
            user_wisata: userWisata,
            wisata_id: wisataId
        }
    });

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    await review.update({ wisata_rating });

    res.json({ msg: "Review updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
    const userWisata = req.params.user_wisata;
    const wisataId = req.params.wisata_id;

  try {
    const review = await ReviewWisata.findOne({
        where: {
            user_wisata: userWisata,
            wisata_id: wisataId
        }
    });

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    await review.destroy();
    res.json({ msg: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
