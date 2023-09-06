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
router.post('/allUsers',verifyUser, getAllUsers)
router.post('/profile',verifyUser, getUserProfile)
router.patch('/updateProfile', updateProfile)
router.patch('/updatePassword', updatePassword)



export default router;