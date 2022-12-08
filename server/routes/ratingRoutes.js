const express = require('express')
const router = express.Router()
const ratingsController = require('../controllers/ratingsController')


const { protect } = require('../middleware/authMiddleware')
router.route('/')
    .get(ratingsController.getAllRatings)
    .post(protect, ratingsController.createNewRating)
    .patch(protect, ratingsController.updateRating)
    .delete(protect, ratingsController.deleteRating)



/*router.route('/login')
    .post(ratingsController.loginUser) */


router.route('/me')
    .get(protect, ratingsController.getMyRatings)

module.exports = router;