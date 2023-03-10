const { registerUser } = require('../service/usersService');

const router = require('express').Router();


//register a new user
router.post('/register', (req, res) => {
    let user = req.body;
    console.log(user)
    registerUser(user).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    })
})



module.exports = router;