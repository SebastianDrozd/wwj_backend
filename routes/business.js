const { createNewBusiness, getBusinessById } = require('../service/businessService');

const router = require('express').Router();

router.get('/:id',(req,res) => {
    getBusinessById(req,res);
})

router.post('/', (req, res) => {
    console.log("hit endpoint")
    createNewBusiness(req,res);
});

module.exports = router;
