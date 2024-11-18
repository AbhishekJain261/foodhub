const express = require("express");
const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
const Product = require("./models/productSchema");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Database Connection
mongoose
    .connect(
        "mongodb+srv://foodhub:qYXMtbu4fSfhtcBV@cluster0.8eiys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
// app.use("/api/users", userRoutes);

// GET route to fetch all recipes
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Product.find(); // Fetch all recipes from the database
        console.log(recipes);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch recipes",
            message: err.message,
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
