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
router.put("/recipes/views/:id", async (req, res) => {
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

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({
            error: "Failed to update totalViews",
            message: err.message,
        });
    }
});

router.put("/recipes/likes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRecipe = await Product.findByIdAndUpdate(
            id,
            { $inc: { totalLikes: 1 } },
            { new: true }
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


router.get("/recipes/comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Product.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json(recipe.comments);
    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch comments",
            message: err.message,
        });
    }
});

// POST a new comment to a specific recipe
router.post("/recipes/comments/:id", async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    
    if (!comment) {
        return res.status(400).json({ error: "Comment text cannot be empty" });
    }

    try {
        const recipe = await Product.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        const text = comment;
        // Add comment to the recipe
        recipe.comments.push({ text:comment });
        await recipe.save();

        res.status(201).json({ message: "Comment added successfully", comments: recipe.comments });
    } catch (err) {
        res.status(500).json({
            error: "Failed to add comment",
            message: err.message,
        });
    }
});

router.post("/recipes/replies/:recipeId/:commentId", async (req, res) => {
    const { recipeId, commentId } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Reply text cannot be empty" });
    }

    try {
        // Find the recipe
        const recipe = await Product.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        // Find the specific comment
        const comment = recipe.comments.find(c => c._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Add the reply to the comment
        comment.replies = comment.replies || [];
        comment.replies.push({ text });

        // Save the updated recipe
        await recipe.save();

        res.status(201).json({
            message: "Reply added successfully",
            replies: comment.replies,
        });
    } catch (err) {
        res.status(500).json({
            error: "Failed to add reply",
            message: err.message,
        });
    }
});

router.delete("/recipes/replies/:recipeId/:commentId/:replyID", async (req, res) => {
    console.log(req.params)
    const { recipeId, commentId, replyID } = req.params;

    try {
        // Find the recipe
        const recipe = await Product.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        // Find the comment to update
        const comment = recipe.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Filter out the specific reply
        const initialReplyCount = comment.replies.length;
        comment.replies = comment.replies.filter(reply => reply._id.toString() !== replyID);

        if (comment.replies.length === initialReplyCount) {
            return res.status(404).json({ error: "Reply not found" });
        }

        // Save the updated recipe
        await recipe.save();

        res.status(200).json({
            message: "Reply deleted successfully",
            comments: recipe.comments, // Send the updated comments array
        });
    } catch (err) {
        res.status(500).json({
            error: "Failed to delete reply",
            message: err.message,
        });
    }
});

// DELETE a specific comment from a recipe
router.delete("/recipes/comments/:recipeId/:commentId", async (req, res) => {
    const { recipeId, commentId } = req.params;

    try {
        const recipe = await Product.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        // Remove the comment
        recipe.comments = recipe.comments.filter(comment => comment._id.toString() !== commentId);
        await recipe.save();

        res.status(200).json({ message: "Comment deleted successfully", comments: recipe.comments });
    } catch (err) {
        res.status(500).json({
            error: "Failed to delete comment",
            message: err.message,
        });
    }
});


module.exports = router;
