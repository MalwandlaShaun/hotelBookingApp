import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import HotelRoutes from "./routes/hotelsRoutes.js";
import RoomRoutes from "./routes/roomsRoutes.js";
import cors from "cors";
const app = express();
import globalErrorHandler from "./controllers/errorController.js";
import AuthRoutes from "./routes/authRoutes.js";
import AppError from "./utils/appError.js";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/usersRoutes.js";
import BookingRoutes from "./routes/bookingRoutes.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/hotels", HotelRoutes);
app.use("/api/room", RoomRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/booking", BookingRoutes);

// Error Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

// Connection
const connection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    throw new AppError("Database connection error", 500);
  }
};

app.listen(process.env.PORT || 5000, () => {
  connection();
  console.log("Server connected");
});
