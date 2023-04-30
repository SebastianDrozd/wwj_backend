const { createNewJobApplication, getUserJobApplicationsById, getBusinessJobApplications, getJobApplicationDetails, updateJobApplicationViewedStatus, updateJobApplicationRejectedStatus } = require("../repo/jobApplicationRepo")
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

const handleGetBusinessJobApplications = async(req,res) => {
    const businessId = req.params.id;
    console.log("this is id", businessId)
    try{
       const response = await getBusinessJobApplications(businessId);
         res.status(200).json(response);
        

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

const handleGetJobApplicationDetails = async(req,res) => {
    const jobApplicationId = req.params.id;
    try{
        console.log("this is id", jobApplicationId)
        const response = await getJobApplicationDetails(jobApplicationId);
    
        res.status(200).json(response);
      
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
const handleUpdateJobApplicationViewedStatus = async(req,res) => {
    const jobApplicationId = req.params.id;
    console.log("this is id", jobApplicationId)
    try{
       const response = await updateJobApplicationViewedStatus(jobApplicationId);
        console.log(response)
        res.status(200).json(response);  
    }catch(err){
        res.status(500).json(err)
    }
}

const handleUpdateJobApplicationRejectedStatus = async(req,res) => {
    const jobApplicationId = req.params.id;
    try{
        const response = await updateJobApplicationRejectedStatus(jobApplicationId);
        console.log(response)
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = {saveJobApplication,getUserJobApplications, handleGetBusinessJobApplications,handleGetJobApplicationDetails,handleUpdateJobApplicationViewedStatus,handleUpdateJobApplicationRejectedStatus}