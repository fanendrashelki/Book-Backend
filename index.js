import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// MongoDB Atlas connection
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGOURL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Routes
app.use('/api', bookRouter);

export default app;