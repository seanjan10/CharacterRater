const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/login')
    .post(usersController.loginUser)

const { protect } = require('../middleware/authMiddleware')
router.route('/me')
    .get(protect, usersController.getMyData)

module.exports = router;