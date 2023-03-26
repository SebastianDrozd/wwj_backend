const { handleGeocode } = require('../utils/geocoder');

const router = require('express').Router();



router.post('/', (req, res) => {
    console.log(req.body)
    let location = req.body.location
    handleGeocode(location).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {

    });
});
module.exports = router;