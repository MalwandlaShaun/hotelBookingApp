import User from "../models/usersModel.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

//Sign up user
const signUp = async (req, res, next) => {
  const { photo, name, email } = req.body;
  console.log("reached here at req.body");
  const hash = await bcrypt.hash(req.body.password, 8);
  console.log(hash);
  try {
    if (req.body.password !== req.body.passwordConfirm) {
      return next(new AppError("Passwords don't match", 400));
    }
    try {
      const newUser = await User.create({
        name: name,
        photo: photo,
        email: email,
        password: hash,
        passwordConfirm: hash,
      });
      console.log(newUser);
      // ...
      try {
        const token = Jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        console.log(token);
        const { password, passwordConfirm, ...otherDetails } = newUser._doc;

        res
          .cookie("access_token", token, { httpOnly: true })
          .status(201)
          .json({
            status: "success",
            token,
            data: {
              user: otherDetails,
            },
          });
      } catch (error) {
        console.error("Error while signing JWT:", error);
      }
    } catch (error) {
      console.error("Error during User.create():", error);
      next(new AppError(error, 400));
    }
  } catch (error) {
    next(new AppError(error, 400));
  }
};

//Sign in user
const logIn = async (req, res, next) => {
  const { email } = req.body;
  console.log("reached here at req.body");
  try {
    const user = await User.findOne({ email: email });
    if (!user) return next(new AppError("User not found", 404));
    console.log("found one here at user.findOne");
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(new AppError("Invalid password", 404));

    const token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const { password, passwordConfirm, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        token,
        data: {
          user: otherDetails,
        },
      });
  } catch (errors) {
    next(new AppError(errors));
  }
};

export { signUp, logIn };
