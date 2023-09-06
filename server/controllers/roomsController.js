import Hotel from "../models/hotelModel.js";
import Room from "../models/roomsModel.js";
import AppError from "../utils/appError.js";

const createRoom = async (req, res, next) => {
  console.log(req.body.hotelId);
  const hotelId = req.body.hotelId;
  try {
    const newRoom = await Room.create(req.body);

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
    } catch (error) {
      next(error);
    }
    res.status(200).json(newRoom);
  } catch (errors) {
    next(new AppError(errors));
  }
};

const getRooms = async (req, res) => {
  const lowPrice = req.body.lowestPrice;
  const heighPrice = req.body.heightPrice;
  try {
    const getRooms = await Room.find({
      price: { $gte: lowPrice, $lte: heighPrice },
    });
    // const getRooms= await Room.find()
    res.status(200).json({
      status: "success",
      result: getRooms.length,
      rooms: getRooms,
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

const roomDetails = async (req, res, next) => {
  const _id = req.body.id;
  console.log("id", req.body.id);
  try {
    const roomDetails = await Room.findById(_id);

    if (!roomDetails) {
      console.log("Room details not found for id:", _id);
      return res.status(404).json({
        status: "error",
        message: "Room details not found",
      });
    }

    console.log("roomDetails", roomDetails);

    res.status(200).json({
      status: "success",
      roomDetails: roomDetails,
    });
  } catch (error) {
    console.error("Error retrieving room details:", error);

    // Log the complete error object
    console.error("Complete error object:", error);

    // Pass the error to the error handling middleware
    next(new AppError("Error retrieving room details", 500));
  }
};



// get room by Hotel
const getRoomsByHotel = async (req, res, next) => {
  const lowPrice = req.body.lowestPrice;
  const heighPrice = req.body.heightPrice;

  const page = req.body.page * 1 || 1;
  const limit = req.body.limit * 1 || 100;
  const skip = (page - 1) * limit;

  console.log("hotelId", req.body.hotelId);

  try {
    // Find rooms based on the provided hotelId
    const rooms = await Room.find({
      hotelId: req.body.hotelId, // Assuming the Room schema has a field for hotelId
      price: { $gte: lowPrice, $lte: heighPrice },
    })
      .skip(skip)
      .limit(limit);

    const numRoom = await Room.countDocuments({
      hotelId: req.body.hotelId,
      price: { $gte: lowPrice, $lte: heighPrice },
    });

    if (page && skip > numRoom) {
      throw new AppError("This page does not exist");
    }

    res.status(200).json({
      status: "success",
      result: numRoom,
      rooms,
    });
  } catch (error) {
    console.log("error", error);
    next(new AppError(error));
  }
};

// UPDATE
const updateRoomAvailability = async (req, res, next) => {
  const { dates } = req.body;
  const {booked} = req.body
 console.log("id", booked, "dates", dates);

  try {
    await Room.updateOne(
      { "booked": booked },
      {
        $push: { "roomNumbers.$.unavailableDates": dates },
      }
    );
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    next(error);
  }
};
export {
  createRoom,
  getRooms,
  roomDetails,
  getRoomsByHotel,
  updateRoomAvailability,
};
