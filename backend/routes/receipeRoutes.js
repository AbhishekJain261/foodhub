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

router.get("/recipes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const recipes = await Product.findOne({_id: id});
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

router.put("/recipes/:id/likes", async (req, res) => {
    const { id } = req.params;

    // if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    //     // Validate the MongoDB ObjectId format
    //     return res.status(400).json({ error: "Invalid recipe ID format" });
    // }

    try {
        const updatedRecipe = await Product.findByIdAndUpdate(
            id,
            { $inc: { totalLikes: 1 } },
            { new: true } // Return the updated document
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        return res.status(200).json({
            message: "Like added successfully",
            totalLikes: updatedRecipe.totalLikes,
        });
    } catch (err) {
        console.error("Error while updating totalLikes:", err);
        return res.status(500).json({
            error: "Failed to add like",
            message: err.message,
        });
    }
});


module.exports = router;
