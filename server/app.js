import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import {createServer} from 'http';
import cors from 'cors';
import {v2 as cloudinary} from 'cloudinary';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from "./constants/events.js";
import {v4 as uuid} from 'uuid';
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";    

import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import adminRoute from './routes/admin.js';

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "6packprogrammer"
export const userSocketIDs = new Map();

connectDB(mongoURI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: corsOptions,
});

app.set("io",io);
// Using MiddleWares here
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/chat',chatRoute);
app.use('/api/v1/admin',adminRoute);

app.get("/",(req,res)=>{
    res.send("Hello World");
});

io.use((socket,next) => {
    cookieParser()(
        socket.request, 
        socket.request.res, 
        async (err) => await socketAuthenticator(err,socket,next)
    );
});

io.on("connection",(socket) =>{
    const user = socket.user;
    userSocketIDs.set(user._id.toString(),socket.id);
    // console.log(userSocketIDs)

    socket.on(NEW_MESSAGE, async({chatId,members,message})=> {
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        }
        console.log("emitting",members)
        const membersSocket = getSockets(members)
        io.to(membersSocket).emit(NEW_MESSAGE,{
            chatId,
            message: messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{
            chatId
        })
        try {
            await Message.create(messageForDB);
        } catch (error) {
            console.log(error)
        }
    });

    socket.on(START_TYPING,({members,chatId}) => {
        console.log("start-typing",chatId);
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(START_TYPING, { chatId })
    });
    
    socket.on(STOP_TYPING,({members,chatId}) => {
        console.log("stop-typing",chatId);
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(STOP_TYPING, { chatId })
    });

    socket.on("disconnect",() => {
        // console.log("user disconnected");
        userSocketIDs.delete(user._id.toString())
    });
});

app.use(errorMiddleware)

server.listen(port,() => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
})