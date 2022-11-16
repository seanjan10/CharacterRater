const User = require('../models/User')
const Rating = require('../models/Rating')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})
// @desc create new user
// @route Post /users
// @access Private
const createNewUsers = asyncHandler( async (req, res) => {
    const { username, email, password, roles } = req.body
    
    //confirm data
    if (!username || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" })
    }
    
    //check for duplicate
    const duplicateUsername = await User.findOne({ username }).lean().exec()
    const duplicateEmail = await User.findOne({ email }).lean().exec()
    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate Username'})
    } else if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate Email'})
    }
    
    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds) //salt rounds

    const userObject = {username, email, "password": hashedPassword, roles}

    //create and store new user
    const user = await User.create(userObject);

    if (user) { //user created
        res.status(201).json({ message: `new user ${username}` })
    }
})

// @desc update a user
// @route patch /users
// @access Private
const updateNewUsers = asyncHandler( async (req, res) => {
    const { id, username, email, password, active, roles,  date_created } = req.body
    if (!id || !username || !email || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean' || typeof date_created !== 'date') {
        return res.status(400).json({ message: 'All fields except password are required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    

    //check for duplicate
    const duplicateUsername = await User.findOne({ username }).lean().exec()
    //Allow updates to the original user
    //if _id.toString === id then thats not a duplicate since thats the user we want to update
    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username "})
    }

    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate Email "})
    }



    user.username = username;
    user.email = email;
    user.roles = roles;
    user.active = active;
    user.date_created = date_created;

    if (password) {
        // Hash
        user.password = await bcrypt.hash(password, saltRounds)
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc delete a user
// @route delete /users
// @access Private
const deleteNewUsers = asyncHandler( async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID Required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()
    res.json(`Username ${result.username} with ID ${result._id} deleted`)
    
})

module.exports = {
    getAllusers, 
    createNewUser,
    updateUser,
    deleteUser
}