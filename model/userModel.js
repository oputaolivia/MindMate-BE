const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    password:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    profileImage:{
        type: String,
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;