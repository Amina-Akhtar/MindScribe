const express = require('express');
const router = express.Router();
const { getNotifications } = require('../controllers/notificationController');
const authenticate=require('../middleware/authenticate');

router.get('/:username', authenticate, getNotifications);

module.exports = router;