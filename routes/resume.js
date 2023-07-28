const express = require('express');
const { handleSaveResume, handleGetUserResumes, handleDeleteUserResume, handleEditUserResume } = require('../service/resumeService');
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
    handleSaveResume(req, res);
    
});

//@desc     Download a candidates resume
//@route    GET /api/v1/resumes/:id/download
//@access   Private

router.get('/:id/download', (req, res) => {
    //will download a user's resume
});

//@desc     Delete a user's resume
//@route    Delete /api/v1/resumes/:id
//@access   Private

router.delete('/:id', (req, res) => {
    handleDeleteUserResume(req,res);
});

//@desc     Edit a user's resume
//@route    Put /api/v1/resumes/:id
//@access   put

router.put('/:id', (req, res) => {
    handleEditUserResume(req,res);
});
module.exports = router;