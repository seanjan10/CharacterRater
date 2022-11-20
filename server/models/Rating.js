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
            type: Number, 
            required: true
        },
        //accounts are considered inactive unless they verify email.
        rating_text: {
            type: String, 
            default: false,
            required: false
        }
    },
    {
        timestamps: true
    }
)

module.export = mongoose.model('Rating', ratingSchema)