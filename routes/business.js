const { createNewBusiness } = require('../service/businessService');

const router = require('express').Router();


router.post('/', (req, res) => {
    console.log("hit endpoint")
    createNewBusiness(req,res);
});

module.exports = router;
