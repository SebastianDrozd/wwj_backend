const express = require('express');
const { getJobPostByBusId, createJobPost } = require('../service/jobPostingService');
const router = express.Router();

router.get('/:id',(req, res) => {
    getJobPostByBusId(req,res)
}); 

router.post('/',(req, res) => {
    createJobPost(req,res);
})

module.exports = router;