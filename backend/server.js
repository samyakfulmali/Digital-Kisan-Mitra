require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const farmerRoutes = require("./routes/farmerRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Digital Kisan Mitra Backend is running!");
});

app.use("/api/farmers", farmerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });