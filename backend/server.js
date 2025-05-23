import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Feedback from "./models/Feedback.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    app.post("/feedback", async (req, res) => {
      try {
        const { userName, rating, feedbackText } = req.body;
        const newFeedback = new Feedback({ userName, rating, feedbackText });
        await newFeedback.save();
        res.status(201).json({ message: "Feedback saved!" });
      } catch (err) {
        res.status(500).json({ message: "Error saving feedback", error: err.message });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

startServer();
