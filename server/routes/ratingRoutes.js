const express = require('express')
const router = express.Router()
const ratingsController = require('../controllers/ratingsController')

router.route('/')
    .get(ratingsController.getAllRatings)
    .post(ratingsController.createNewRating)
    //.patch(ratingsController.updateRating)
    //.delete(ratingsController.deleteRating)

/*router.route('/login')
    .post(ratingsController.loginUser)

const { protect } = require('../middleware/authMiddleware')
router.route('/me')
    .get(protect, ratingsController.getMyData) */

module.exports = router;