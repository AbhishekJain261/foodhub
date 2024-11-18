// routes/recipeRoutes.js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// GET route to fetch all products from the 'test' collection

router.get("/recipes", async (req, res) => {
    try {
        const recipes = await Product.find();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch recipes",
            message: err.message,
        });
    }
});

// PUT route to increment totalViews for a specific product
router.put("/recipes/:id/views", async (req, res) => {
    const { id } = req.params; // Extract product ID from the route parameters

    try {
        // Find the product by ID and increment the totalViews field
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $inc: { totalViews: 1 } }, // Increment totalViews by 1
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct); // Return the updated product
    } catch (err) {
        res.status(500).json({
            error: "Failed to update totalViews",
            message: err.message,
        });
    }
});

module.exports = router;
