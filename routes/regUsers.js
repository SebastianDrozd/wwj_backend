const { getRegularUserProfileInfo, handleCompleteProfile, handleEditUserProfile } = require('../service/regUsersService');

const router = require('express').Router();


router.get('/:email', (req, res) => {
    console.log("getRegularUserProfileInfo")
    getRegularUserProfileInfo(req, res);
});

//@desc     Complete the user profile process . Add phone number, address to customer profile. Set account status to active
//@route    POST /api/v1/regUsers/completeProfile
//@access   Private

router.post('/completeProfile', (req, res) => {
    handleCompleteProfile(req, res);
});

//@desc     Edit User Profile Information
//@route    PUT /api/v1/regUsers
//@access   Private

router.put('/', (req, res) => {
    console.log("hit")
    handleEditUserProfile(req, res);
});

module.exports = router