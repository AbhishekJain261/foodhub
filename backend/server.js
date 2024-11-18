const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const recipeRoutes = require("./routes/receipeRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/", recipeRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
