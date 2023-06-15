import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';
import { getUsers, Register, Login, Logout } from '../controllers/Users.js';
import { getUserProfileByUsername, createUserProfile, updateUserProfile, deleteUserProfile, uploadFile } from '../controllers/UserProfile.js';
import { createTrip, getTripById, updateTrip, deleteTrip, uploadTripImage } from '../controllers/Trip.js';
import { createTripDetail, getTripDetailById, updateTripDetail, deleteTripDetail, deleteTripDetailByIdAndTripType } from '../controllers/TripDetail.js';
import { createDestination, getDestinationById, updateDestination, deleteDestination, uploadDestinationImage, getAllDestination } from '../controllers/Destination.js';
import { getAllReviewsByPlace, getAllReviewsById, createReview, updateReview, deleteReview } from '../controllers/ReviewWisata.js';
import { recommendCollab, recommendContentBased, recommendSimilarItem } from '../controllers/MachineLearning.js';
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
router.get("/users/:username", verifyToken, getUserProfileByUsername);
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

// controllers/TripDetail.js routes
router.get('/trip/detail/:id', getTripDetailById);
router.post('/trip/detail/create', createTripDetail);
router.put('/trip/detail/:id/:trip_name_type/:name_wisata', updateTripDetail);
router.delete('/trip/detail/:id', deleteTripDetail);
router.delete('/trip/detail/:id/:trip_name_type', deleteTripDetailByIdAndTripType);

// controllers/Destination.js routes
router.get('/destination', getAllDestination);
router.get('/destination/:id', getDestinationById);
router.post('/destination/create', createDestination);
router.put('/destination/:id', updateDestination);
router.delete('/destination/:id', deleteDestination);
router.post('/destination/:id/uploadImage', processFileMiddleware, uploadDestinationImage);

// controllers/ReviewWisata.js routes
router.get('/destination/review/place/:wisata_id', getAllReviewsByPlace);
router.get('/destination/review/user/:user_wisata', getAllReviewsById);
router.post('/destination/review/create', createReview);
router.put('/destination/review/update/:user_wisata/:wisata_id', updateReview);
router.delete('/destination/review/delete/:user_wisata/:wisata_id', deleteReview);

// controllers/MachineLearning.js routes
router.post('/ml/recommendCollab', recommendCollab);
router.post('/ml/recommendContentBased', recommendContentBased);
router.post('/ml/recommendSimilarItem', recommendSimilarItem);

export default router;
