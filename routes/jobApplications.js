const { saveJobApplication, getUserJobApplications } = require('../service/jobApplicationService');

const router = require('express').Router();


router.post('/',(req,res) => {
    saveJobApplication(req,res)
})
router.get("/users/:id", (req, res) => {
    getUserJobApplications(req, res)
});
module.exports = router;