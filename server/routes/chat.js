import express from "express";
import { getMyProfile, login, logout, newUser, searchUser } from "../controllers/user.js";
import { attachmentsMulter, singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, getMyGroups, newGroupChat, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { addMemberValidator, chatIdValidator,newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, validateHandler } from "../lib/validators.js";
const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.post("/new",newGroupValidator(),validateHandler,newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMemberValidator(),validateHandler,addMembers);
app.put("/removemember",removeMemberValidator(),validateHandler,removeMember);
app.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup)

// Send Attachments
app.post("/message",attachmentsMulter,sendAttachmentValidator(),validateHandler,sendAttachments)

// Get Messages
app.get("/message/:id",chatIdValidator(),validateHandler,getMessages);

// Get Chat Details, rename, delete
app.route("/:id").get(chatIdValidator(),validateHandler,getChatDetails).put(renameValidator(),validateHandler,renameGroup).delete(chatIdValidator(),validateHandler,deleteChat);


export default app;