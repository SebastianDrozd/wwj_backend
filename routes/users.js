const authenticateToken = require('../middleware/jwtMiddleware');
const { getUserById, getUserByEmail, getUserCompleteProfile } = require('../repo/usersRepo');
const { registerUser, confirmConfirmationToken, loginUser, refreshToken, handleRecaptcha } = require('../service/usersService');

const router = require('express').Router();

router.get('/:id',authenticateToken, (req, res) => {
    console.log("these are params ", req.params)
    let id = req.params.id;
    /* getUserByEmail(id).then((result) => {
        res.send(result);
    }) */
    getUserCompleteProfile(id).then((result) => {
        res.send(result);
    })
   
})

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
    console.log("route hit")
    const user = req.body;
    loginUser(user,res).then((result) => {
        console.log("sucessfully logged in")
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
//recaptcha route
router.post("/recaptcha",(req,res) => {
    const token = req.body.token;
    console.log("this is the token ", token)
    handleRecaptcha(token).then((result) => {
        res.send(result);
    })
    .catch(err => {
        res.send(err)
    })
})

router.post("/logout",(req,res) => {
    
})





module.exports = router;