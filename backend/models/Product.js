const mongoose = require("mongoose");

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

        totalViews: { type: Number, default: 0 },

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
