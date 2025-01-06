const mongoose = require("mongoose");

// Comment schema with replies
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    replies: [
        {
            text: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
});

// Product schema
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: Array,
        },
        image: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
        totalViews: { type: Number, default: 0 },
        totalLikes: { type: Number, default: 0 },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema, "test");