import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';
import { getUsers, Register, Login, Logout } from '../controllers/Users.js';
import { getUserProfileById, createUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/UserProfile.js';
import { uploadFile } from '../controllers/FileUpload.js';

const router = express.Router();

// Route untuk halaman homepage
router.get('/', (req, res) => {
    const homePath = path.join(__dirname, '../public/index.html');
    res.sendFile(homePath);
  });

// controllers/Users.js routes
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// controllers/UserProfile.js routes
router.get("/users/:id", verifyToken, getUserProfileById);
router.post('/users/createProfile', verifyToken, createUserProfile);
router.put('/users/updateProfile', verifyToken, updateUserProfile);
router.delete('/users/deleteProfile', verifyToken, deleteUserProfile);

// controllers/FileUpload.js routes
router.post("/upload", verifyToken, uploadFile); 
// router.post("/upload/files", getFile); 
// router.post("/upload/files/:name", downloadFile); 

export default router;
