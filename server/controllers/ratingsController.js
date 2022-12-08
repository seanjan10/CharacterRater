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

// @desc get all users ratings
// @route GET /ratings
// @access Private
const getMyRatings = asyncHandler( async (req, res) => {
    const ratings = await Rating.find({ user: req.user.id})
    
    return res.status(200).json(ratings);
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

// @desc update a rating
// @route patch /ratings
// @access Private
const updateRating = asyncHandler(async (req, res) => {
    const {id, rating, rating_text} = req.body

    if (!id || !rating) {
        return res.status(400).json({message: "id, user and rating are required"})
    }

    const getRating = await Rating.findById(id).exec()

    if (!getRating) {
        return res.status(400).json({ message: "Rating with that ID not found"});
    }

    const previousRating = getRating.rating
    const previousRatingText = getRating.rating_text

    const userID = await User.findById(req.user.id);

    if (!userID) {
        return res.status(401).json({message: "User not found"})
    }

    // logged in user matches review user
    if (getRating.user.toString() !== userID.id) {
        return res.status(401).json({message: "User not Authorized"})
    }

    getRating.rating = rating
    if (rating_text) {
        getRating.rating_text = rating_text
    }
    const updatedRating = await getRating.save();

    return res.status(200).json({message: `Updated Rating changed from ${previousRating}/10 to ${updatedRating.rating}/10. Rating text changed to ${previousRatingText} --> ${updatedRating.rating_text}`})

})

// @desc delete a rating
// @route patch /ratings
// @access Private
const deleteRating = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({message: "id required for deletion"})
    }

    const ratingID = await Rating.findById(id).exec();

    if (!ratingID) {
        return res.status(400).json({message: "rating with that id could not be found"});
    }

    const userID = await User.findById(req.user.id);

    if (!userID) {
        return res.status(401).json({message: "User not found"})
    }

    // logged in user matches review user
    if (ratingID.user.toString() !== userID.id) {
        return res.status(401).json({message: "User not Authorized"})
    }


    const result = await ratingID.deleteOne();
    return res.status(200).json({message: `Rating by ${userID?.user} with id ${result._id} and rating ${result.rating} and text ${result.rating_text} deleted`})
})


module.exports = {
    getAllRatings,
    getMyRatings,
    createNewRating,
    updateRating,
    deleteRating
}