import express from 'express';
import {
  getAllUsers,
  updateProfile,
  getUserProfile,
  updatePassword
} from "../controllers/usersController.js";
import { verifyToken, verifyUser } from '../middleware/VerifyToken.js';

const router = express.Router();

//GET USERS
router.post('/allUsers', getAllUsers)
router.post('/profile', getUserProfile)
router.patch('/updateProfile', updateProfile)
router.patch('/updatePassword', updatePassword)



export default router;