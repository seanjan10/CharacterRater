const User = require('../models/User')
const Rating = require('../models/Rating')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

// @desc get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})
// @desc create new user
// @route Post /users
// @access Private
const createNewUser = asyncHandler( async (req, res) => {
    const { username, email, password, roles } = req.body
    
    // console.log(username)
    // console.log(email)
    // console.log(password)
    // console.log(roles);
    // console.log(Array.isArray(roles))
    //console.log(roles.length)

    //confirm data
    if (!username || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({message: "Valid email required"})
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({message: "Strong password required. (Length: 8+, At least 1 lower and upper case, 1+ Number, 1+ Symbol)"})
    }
    //TODO: username constraints i.e. regex
    //console.log(typeof username);
    // if (typeof username !== "string") {
    //     return res.status(400).json({ message: "Username must be a string" })
    // }

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
    const userToken = generateToken(user._id)

    
    if (user) { //user created
        res.status(201).json({ message: `new user ${username} their JWT is ${userToken}` })
    } else {
        res.status(400).json({ message: "Invalid User Data"})
    }
})

// @desc validate user login
// @route Post /users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            message: `You can access ${username}'s account now. Your ID is ${user._id} and your JWT is ${generateToken(user._id)}`
        })
    } else {
        res.status(400).json({message: "Error password is incorrect"})
    }


})

// // @desc validate user signup
// // @route Post /users/signup
// // @access public
// const signupUser = asyncHandler(async (req, res) => {
//     const {username, password} = req.body

//     const user = await User.findOne({username})

//     if (user && (await bcrypt.compare(password, user.password))) {
//         res.json({
//             message: `You can access ${username}'s account now. Your ID is ${user._id} and your JWT is ${generateToken(user._id)}`
//         })
//     } else {
//         res.status(400).json({message: "Error password is incorrect"})
//     }


// })



// @desc get logged in user data
// @route get /users/me
// @access private
const getMyData = asyncHandler(async (req, res) => {
    //res.json({message: 'User data display'})

    const { _id, username, email, roles } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        username,
        email,
        roles
    })
})




// @desc update a user
// @route patch /users
// @access Private
const updateUser = asyncHandler( async (req, res) => {
    const { id, username, email, password, active, roles,  date_created } = req.body
    
    //console.log(`id = ${id}\tusername=${username}\temail=${email}\troles is array = ${Array.isArray(roles)}\troles length = ${roles.length}\ttype of active = ${typeof active}`)

    if (!id || !username || !email || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
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
const deleteUser = asyncHandler( async (req, res) => {
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

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',

    })
}


module.exports = {
    getAllUsers, 
    createNewUser,
    loginUser,
    //signupUser,
    updateUser,
    deleteUser,
    getMyData
}