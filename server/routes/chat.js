import express from "express";
import { getMyProfile, login, logout, newUser, searchUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, getMyGroups, newGroupChat, addMembers, removeMember, leaveGroup } from "../controllers/chat.js";
const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.post("/new",newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMembers);
app.put("/removemember",removeMember);

app.delete("/leave/:id",leaveGroup)

export default app;