import UserProfile from "../models/allModels/UserProfileModel.js";

export const getUserProfileById = async (req, res) => {
    const userId = req.params.id; // Gets the ID from the URL parameter
    const email = req.email; // Using an email from a verified token
  
    try {
      // Retrieving UserProfile information by ID
      const userProfile = await UserProfile.findOne({
        where: { id: userId, email }
      });
  
      if (!userProfile) {
        return res.status(404).json({ msg: "You don't have access" });
      }
  
      res.json(userProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  

export const createUserProfile = async (req, res) => {
    const { name, phone_number, address, photo_profile, user_lat, user_lot } = req.body;
    const email = req.email; // Using an email from a verified token
  
    try {
      // Check if a user profile with the same email already exists
      const existingProfile = await UserProfile.findOne({
        where: { email }
      });
  
      if (existingProfile) {
        return res.status(400).json({ msg: "User profile already exists" });
      }
  
      // Create a new user profile if it doesn't already exist
      const userProfile = await UserProfile.create({
        name,
        phone_number,
        address,
        photo_profile,
        user_lat,
        user_lot,
        email
      });
  
      res.json(userProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  

export const updateUserProfile = async (req, res) => {
  const { name, phone_number, address, photo_profile, user_lat, user_lot } = req.body;
  try {
    const userProfile = await UserProfile.findOne({ where: { email: req.email } });
    if (!userProfile) {
      return res.status(404).json({ msg: "User profile not found" });
    }
    await userProfile.update({
      name,
      phone_number,
      address,
      photo_profile,
      user_lat,
      user_lot
    });
    res.json({ msg: "User profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteUserProfile = async (req, res) => {
    const email = req.email; // Using an email from a verified token
  
    try {
      const userProfile = await UserProfile.findOne({ where: { email } });
  
      if (!userProfile) {
        return res.status(404).json({ msg: "User profile not found" });
      }
  
      // Added checking whether the authorized email matches the profile email of the user to be deleted
      if (userProfile.email !== email) {
        return res.status(403).json({ msg: "Unauthorized" });
      }
  
      await userProfile.destroy();
      res.json({ msg: "User profile deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  