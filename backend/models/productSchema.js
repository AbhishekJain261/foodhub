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

module.exports = mongoose.model("products", productSchema);
