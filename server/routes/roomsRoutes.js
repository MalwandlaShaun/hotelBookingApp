import express from "express";
import {
  createRoom,
  getAllRooms,
  getRooms,
  getRoomsByHotel,
  roomDetails,
  updateRoomAvailability
} from "../controllers/roomsController.js";
import { verifyAdmin, verifyUser } from "../middleware/VerifyToken.js";

const router = express.Router();

//POST
router.post("/createRoom", createRoom);
//GET
router.post("/getAllRooms", getAllRooms);
//GET
router.post("/allRooms", getRooms);
//GET
router.post("/getRoomsByHotel", getRoomsByHotel);
//GET
router.post("/details", roomDetails);
//PATCH
router.patch("/availability", updateRoomAvailability);

// router.patch("/:id", updateRoom);

export default router;
