const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/userController');
const authenticate=require('../middleware/authenticate')

router.post('/signup', signup);
router.post('/signin',signin);
router.post('/signout',authenticate,signout);

module.exports = router;