const express = require('express');
const { getJobPostByBusId } = require('../service/jobPostingService');
const router = express.Router();

router.get('/:id',(req, res) => {
    getJobPostByBusId(req,res)
 
}); 

module.exports = router;