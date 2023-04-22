const { createNewJobApplication, getUserJobApplicationsById } = require("../repo/jobApplicationRepo")
const uuid = require("uuid");

const saveJobApplication = async (req,res) => {
    let application = req.body
    try{
        let id = uuid.v4()
        application = {...application, job_application_id: id}
        const result = await createNewJobApplication(application)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
} 
const getUserJobApplications = async (req,res) => {
    const userId = req.params.id;
    try{
        const result = await getUserJobApplicationsById(userId);
        res.status(200).json(result)
        

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports = {saveJobApplication,getUserJobApplications}