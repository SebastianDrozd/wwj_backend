const { createNewJobApplication } = require("../repo/jobApplicationRepo")


const saveJobApplication = async (req,res) => {
    const application = req.body
    try{
        const result = await createNewJobApplication(application)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports = {saveJobApplication}