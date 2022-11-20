const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: false,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    //accounts are considered inactive unless they verify email.
    active: {
        type: Boolean, 
        default: false
    },
    roles: [{
        type: String, 
        default: "User"
    }],
    date_created: {
        type: Date,
        default: new Date(),
        required: false
    }   
})
module.exports = mongoose.model('User', userSchema)