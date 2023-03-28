const { getRegularUserProfileInfo } = require('../service/regUsersService');

const router = require('express').Router();


router.get('/:email', (req, res) => {
    console.log("getRegularUserProfileInfo")
    getRegularUserProfileInfo(req, res);
});
module.exports = router