import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { getUserProfile, createUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/UserProfile.js";
import { getTrip, createTrip, updateTrip, deleteTrip } from "../controllers/Trip.js";

const router = express.Router();

//user_account endpoint
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
//end of user_account endpoint

//user_profile endpoint
router.get("/users/:id", verifyToken, getUserProfile);
router.post("/users/createProfile", verifyToken, createUserProfile);
router.put("/users/updateProfile/:id", verifyToken, updateUserProfile);
router.delete("/users/deleteProfile/:id", verifyToken, deleteUserProfile);
//end of user_profile endpoint

//trip endpoint
router.get("/trip/:id", verifyToken, getTrip);
router.post("/trip/createTrip", verifyToken, createTrip);
router.put("/trip/updateTrip/:id", verifyToken, updateTrip);
router.delete("/trip/deleteTrip/:id", verifyToken, deleteTrip);
//end of trip endpoint

export default router;