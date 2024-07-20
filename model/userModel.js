const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    }
}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel