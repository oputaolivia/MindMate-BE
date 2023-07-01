const mongoose = require("mongoose");

let tokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600,
    },
});

const Token = mongoose.model("token", tokenSchema);
module.exports = {Token};