const express = require('express');
const { handleSaveResume, handleGetUserResumes } = require('../service/resumeService');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
//@desc     Get all user's uploaded resumes
//@route    GET /api/v1/resumes/users/:id
//@access   Private

router.get('/users/:id', (req, res) => {
   //will return user resumes
    handleGetUserResumes(req, res)
});

//@desc     Upload a user's resumes
//@route    POST /api/v1/resumes
//@access   Private

router.post('/',  upload.single('avatar'), (req, res) => {
    console.log("endpoint hit")
    //will upload a user's resume
    handleSaveResume(req, res);
    
});

//@desc     Download a candidates resume
//@route    GET /api/v1/resumes/:id/download
//@access   Private

router.get('/:id/download', (req, res) => {
    //will download a user's resume
});

module.exports = router;