const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://foodhub:qYXMtbu4fSfhtcBV@cluster0.8eiys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;