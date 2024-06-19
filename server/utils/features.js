import mongoose from "mongoose";

const connectDB = (DB) => {
    mongoose
        .connect(DB)
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        });
};

export { connectDB };