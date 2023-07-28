const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const { handleGetUserNotifications } = require('../service/userNotificationsService');

//@desc     Get all user notifications
//@route    GET /api/v1/notifications/:userId
//@access   Private

router.get('/:userId', (req, res) => {
    handleGetUserNotifications(req, res);
});
module.exports = router;