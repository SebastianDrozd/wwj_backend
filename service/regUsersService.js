const { getUserProfileInfo } = require("../repo/regUsersRepo")

const getRegularUserProfileInfo = async (req, res) => {
    const email = req.params.email
    console.log("this is email", email)
    try{
        const data = await getUserProfileInfo(email);
        res.send(data)
    }catch(err){
        res.status(500).json({message: "Something went wrong"})
}
}

module.exports = {getRegularUserProfileInfo}