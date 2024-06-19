import {User} from '../models/user.js'

// Create a new user and save it to the database and save in cookie
const newUser = async (req,res) => {

    const avatar = {
        public_id: "slhkre",
        url: "lhdkfjps"
    }

    await User.create({ 
        name: "Chaman",
        username: "chaman",
        password: "chaman",
        avatar
    });
    res.status(201).json({ message: "User created Successfully" });
}

const login = (req,res) => {
    res.send("Hello World");
}



export {login,newUser};