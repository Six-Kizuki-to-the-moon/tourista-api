import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';
import { getUsers, Register, Login, Logout } from '../controllers/Users.js';
import { getUserProfileById, createUserProfile, updateUserProfile, deleteUserProfile, uploadFile } from '../controllers/UserProfile.js';
import { createTrip, getTripById, updateTrip, deleteTrip, uploadTripImage } from '../controllers/Trip.js';
import { createDestinationWisata, getDestinationWisataById, updateDestinationWisata, deleteDestinationWisata } from '../controllers/DestinationWisata.js';
import { createDestinationDetail, getDestinationDetailById, updateDestinationDetail, deleteDestinationDetail, uploadDestinationDetailImage } from '../controllers/DestinationDetail.js';
import processFileMiddleware from '../middleware/ProcessFile.js';
// import { uploadFile } from '../controllers/PhotoProfileGcs.js';

const router = express.Router();

// Route untuk halaman homepage
router.get('/', (req, res) => {
    const homePath = path.join(__dirname, '../public/index.html');
    res.sendFile(homePath);
  });

// controllers/Users.js routes
// router.get('/users', verifyToken, getUsers);
router.post('/auth/register', Register);
router.post('/auth/login', Login);
router.get('/auth/token', refreshToken);
router.delete('/auth/logout', Logout);

// controllers/UserProfile.js routes
router.get("/users/:id", verifyToken, getUserProfileById);
router.post('/users/createProfile', verifyToken, createUserProfile);
router.put('/users/updateProfile', verifyToken, updateUserProfile);
router.delete('/users/deleteProfile', verifyToken, deleteUserProfile);
router.post("/users/uploadProfile", verifyToken, uploadFile);

// controllers/Trip.js routes
router.get('/trip/:id', getTripById);
router.post('/trip', createTrip);
router.put('/trip/:id', updateTrip);
router.delete('/trip/:id', deleteTrip);
router.post('/trip/:id/uploadImage', processFileMiddleware, uploadTripImage);

// controllers/DestinationWisata.js routes
router.get('/destination/:id', getDestinationWisataById);
router.post('/destination', createDestinationWisata);
router.put('/destination/:id', updateDestinationWisata);
router.delete('/destination/:id', deleteDestinationWisata);

// controllers/Destination.js routes
router.get('/destination/detail/:id', getDestinationDetailById);
router.post('/destination/detail', createDestinationDetail);
router.put('/destination/detail/:id', updateDestinationDetail);
router.delete('/destination/detail/:id', deleteDestinationDetail);
router.post('/destination/detail/:id/uploadImage', processFileMiddleware, uploadDestinationDetailImage);

export default router;
