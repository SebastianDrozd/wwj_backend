const { saveJobApplication } = require('../service/jobApplicationService');

const router = require('express').Router();


router.post('/',(req,res) => {
    saveJobApplication(req,res)
})
module.exports = router;