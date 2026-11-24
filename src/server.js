require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const PORT = process.env.PORT || 5000;
const { StatusCodes } = require("http-status-codes");

//Initailize app
const app = express();
//Middleware
app.use(express.json());
//Routes
app.use("/api/users", userRouter);

//Error handling middleware
//404
app.use((req, res, next) =>{
  const error = new Error("Not Found!");
  error.status = StatusCodes.NOT_FOUND;
  next(error);
});
//Global Error handler
app.use((err, req, res, next) =>{
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error!",
    status: "error"
  })
})

//Connect to database
//Listening server
async function startServer() {
 const mongoUri = process.env.MONGOOSE_URI;
 if (!mongoUri) {
  throw new Error("MONGOOSE_URI is not set. Add it to your .env file.");
 }

 await mongoose.connect(mongoUri);
 console.log("MongoDB connected");
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });
}

startServer().catch((error) => {
 console.error("Failed to start server:", error);
 process.exit(1);
});