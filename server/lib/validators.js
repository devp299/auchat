import { body,validationResult,param,query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";
// import { query } from "express";

const validateHandler = (req,res,next) => {
    const errors = validationResult(req);

    const errorMessages = errors.array().map((error) => error.msg).join(", ");
    console.log(errorMessages);
    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages,400))
}

const registerValidator = () => [
    body("name","Please Enter name").notEmpty(),
    body("username","Please Enter Username").notEmpty(),
    body("bio","Please Enter Bio").notEmpty(),
    body("password","Please Enter Password").notEmpty()
];

const loginValidator = () => [
    body("username","Please Enter Username").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
    body("name","Please Enter Name").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({ min: 2, max: 100 })
        .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
    body("chatId","Please Enter chat Id").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({ min: 1, max: 97 })
        .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
    body("chatId","Please Enter chat Id").notEmpty(),
    body("userId","Please Enter user Id").notEmpty()
];

const sendAttachmentValidator = () => [
    body("chatId","Please Enter chat Id").notEmpty(),
];

const chatIdValidator = () => [
    param("id","Please Enter Chat ID").notEmpty()
];

const renameValidator = () => [
    param("id","Please Enter Chat ID").notEmpty(),
    body("name","Please Enter New Name").notEmpty()    
];

const sendRequestValidator = () => [
    body("userId","Please Enter UserId").notEmpty()    
];

const acceptRequestValidator = () => [
    body("requestId","Please Enter Request Id").notEmpty(), 
    body("accept").notEmpty().withMessage("Please Add accept").isBoolean().withMessage("Accept must be a boolean.")
];

const adminLoginValidator = () => [
    body("secretKey","Please Enter Secret Key").notEmpty(), 
];

export { acceptRequestValidator,renameValidator,chatIdValidator,sendRequestValidator,removeMemberValidator,registerValidator,validateHandler,loginValidator,newGroupValidator,addMemberValidator,sendAttachmentValidator,adminLoginValidator };