const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        character_name: {
            type: String, 
            required: true
        },
        name_of_series: {
            type: String, 
            required: true
        },
        character_id: {
            type: String, 
            required: true
        },
        rating: {
            type: Integer, 
            required: true
        },
        //accounts are considered inactive unless they verify email.
        active: {
            type: String, 
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.export = mongoose.model('Rating', ratingSchema)