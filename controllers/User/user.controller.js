import { ErrorResponse, successResponse, successResponseWithData } from "../../middlewares/apiResponse.js";
import { compairPassword, hashingPassword } from "../../middlewares/authHelper.js";
import userModel from "../../models/User/user.model.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const { fname, lname, email, password, phoneno, countryCode, role, dob } = req.body;

    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return ErrorResponse(res, "User already exists");
    }
    const hashedPassword = hashingPassword(password);


    const user = await new userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
      phoneno,
      profilePic: "",
      role,
      dob,
      countryCode
    }).save();

    console.log("user")

    return successResponse(res, "User Register Sucessfully");
  } catch (error) {
    console.log("err", error)
    return ErrorResponse(error,"Error creating user");
  }
};

export const LoginUser=async(req,res)=>{
 try{
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return notFoundResponse(res, "email not found");
  }

  const match = await compairPassword(password, user.password);
    if (!match) {
      return ErrorResponse(res, "Password Wrong");
    }

    const additionalData = {
      fname: user.fname,
      lname: user.lname,
      phoneno: user.phoneno,
      email: user.email,
      role: user.role,
    };

    const jwtPayload = { _id: user._id, ...additionalData };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return successResponseWithData(res, "Login successfully", {
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phoneno: user.phoneno,
        role: user.role,
      },
      token,
    });

 }catch(error){
  console.log(error);
 }
}