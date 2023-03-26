const express = require('express');
const { getAllJobPostings } = require('../repo/jobPostingRepo');
const { getJobPostByBusId, createJobPost, jobQuery, getAllJobTitles } = require('../service/jobPostingService');
const router = express.Router();

router.get("/", (req, res) => {
    getAllJobPostings().then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
})

router.get('/:id',(req, res) => {
    getJobPostByBusId(req,res)
}); 

router.post('/',(req, res) => {
    createJobPost(req,res);
})

router.get('/search/query', (req, res) => {
  jobQuery(req,res);
});
router.post('/titles', (req, res) => {
    getAllJobTitles(req,res);
})

module.exports = router;