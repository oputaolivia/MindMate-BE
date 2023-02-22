const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: mongoose.Schema.Types.Mixed,
    },
    password:{
        type: mongoose.Schema.Types.Mixed,
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;