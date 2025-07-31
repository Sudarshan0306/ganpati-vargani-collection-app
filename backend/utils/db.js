import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`mongodb+srv://sudarshanshinde3999:DA7okglsct2kEvUj@ganpati-app.i4rc4r3.mongodb.net/?retryWrites=true&w=majority&appName=ganpati-app`);
};

export default connectDb;
