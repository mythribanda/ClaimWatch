const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const claimRoutes = require("./routes/claimRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(express.json());

// Routes
app.use("/api", claimRoutes);

app.get("/", (_req, res) => {
  res.send("Fraud Detection Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

