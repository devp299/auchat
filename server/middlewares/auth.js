import { adminSecretKey } from "../app.js";
import { AUCHAT_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken';

const isAuthenticated = (req,res,next) => {
    const token = req.cookies["auchat-token"];

    if(!token) 
        return next(new ErrorHandler("Please login to access the route",401));

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    
    req.user = decodedData._id;

    next();
};

const adminOnly = (req,res,next) => {
    const token = req.cookies["auchat-admin-token"];

    if(!token) 
        return next(new ErrorHandler("Only admin can access the route",401));

    const secretKey = jwt.verify(token,process.env.JWT_SECRET);
    const isMatched = secretKey === adminSecretKey

    if(!isMatched) return next(new ErrorHandler("Invalid Admin Key",401));

    next();
};

const socketAuthenticator = async (err,socket,next) => {

    try{
        // if(err) console.log(err);

        const authToken = socket.request.cookies["auchat-token"];
        console.log(authToken);
        if(!authToken) return next(new ErrorHandler("Please login to access this route",401));

        const decodedData = jwt.verify(authToken,process.env.JWT_SECRET)

        const user = await User.findById(decodedData._id);

        if(!user) return next(new ErrorHandler("Please login to access this route",401));

        socket.user = user;
        return next();
    }catch(error){
        console.log(error);
        return next(new ErrorHandler("Please login to access this route",401))
    }
};

export { isAuthenticated,adminOnly,socketAuthenticator };