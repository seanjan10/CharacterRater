const User = require('../models/User')
const Rating = require('../models/Rating')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc get all ratings
// @route GET /ratings
// @access Private
const getAllRatings = asyncHandler( async (req, res) => {
    const ratings = await Rating.find().lean()
    if (!ratings?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(ratings)
})

// @desc create new rating
// @route POST /ratings
// @access Private
const createNewRating = asyncHandler(async (req, res) => {
    const {user, rating, character_name, name_of_series, character_id, rating_text} = req.body

    //check to see if user exists for rating to be valid
    const definedUser = await User.findOne({ user }).lean().exec();
    if (!definedUser) {
        return res.status(404).json({ message: 'The user does not exist in the database'})
    }

    if (!rating || !character_name || !character_id || !name_of_series) {
        return res.status(400).json({ message: 'Error: missing mandatory fields'})
    }

    //make sure no duplicate ratings, only 1 and then it can be updated
    const dupRating = await Rating.findOne({ user, rating, character_name, character_id, name_of_series}).lean().exec();

    if (dupRating) {
        return res.status(400).json({ message: "rating already exists, please update instead of inserting a new one."})
    }

    const ratingObject = {user, rating, character_name, name_of_series, character_id, rating_text}

    const createdRating = await Rating.create(ratingObject);

    if (createdRating) {
        return res.status(200).json({message: `User ${user} created a review for ${character_name} (id=${character_id}). They gave them a ${rating}/10 and provided this optional text: ${rating_text}`})
    } else {
        return res.status(400).json({message: "ERROR: incorrect data provided"})
    }


})


module.exports = {
    getAllRatings,
    createNewRating
}