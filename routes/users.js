const { registerUser } = require('../service/usersService');

const router = require('express').Router();


//register a new user
router.post('/register', (req, res) => {
    registerUser(req.body).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    })
})



module.exports = router;