import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const cookieOptions = {
    maxAge: 15*24*60*60*1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

const connectDB = (DB) => {
    mongoose
        .connect(DB)
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        });
};

const sendToken = (res,user,code,message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    console.log(token)

    return res.status(code).cookie("auchat-token",token,cookieOptions).json({
        success: true,
        message,
    })
}

const emitEvent = (req,event,users,data) => {
    console.log("Emmiting the event",event);
}

const deleteFilesFromCloudinary = async(public_ids) => {

}
export { connectDB, sendToken, cookieOptions, emitEvent,deleteFilesFromCloudinary};