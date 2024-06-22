import express from "express";
import { getMyProfile, login, logout, newUser, searchUser } from "../controllers/user.js";
import { attachmentsMulter, singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, getMyGroups, newGroupChat, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.post("/new",newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMembers);
app.put("/removemember",removeMember);
app.delete("/leave/:id",leaveGroup)

// Send Attachments
app.post("/message",attachmentsMulter,sendAttachments)

// Get Messages
app.get("/message/:id",getMessages);

// Get Chat Details, rename, delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);


export default app;