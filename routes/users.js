const { registerUser, confirmConfirmationToken, loginUser, refreshToken } = require('../service/usersService');

const router = require('express').Router();


//register a new user
router.post('/register', (req, res) => {
    console.log("this is the body ", req.body)
    registerUser(req.body).then((result) => {
        res.send(result)
    }).catch((err) => {
        if(err.statusCode == undefined){
            res.send(err)
        }
        else{
            res.status(err.statusCode).send(err);
        }
       
    })
})

router.get("/confirm/:confirmationToken", (req, res) => {
    confirmConfirmationToken(req.params.confirmationToken).then((result) => {
        res.send(result);
    })
    .catch((err) => {
        if(err.statusCode == undefined){
            res.send(err)
        }
        else{
            res.status(err.statusCode).send(err);
        }
    })
})

router.post("/login", (req, res) => {
    const user = req.body;
    loginUser(user,res).then((result) => {
        res.send(result);
    })
    .catch(err => {
        res.status(err.statusCode).send(err);
    })
})

router.post("/refresh",(req,res) => {
    refreshToken(req,res).then((result) => {
        res.send(result);
    })
    .catch(err => {
        res.status(err.statusCode).send(err);
    })
    
})



module.exports = router;