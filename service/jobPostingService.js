const { createNewJobPostAddress } = require("../repo/jobPostAddressRepo");
const { getJobPostingByBusinessId, createNewJobPost, getJobPostQuery, getJobTitles } = require("../repo/jobPostingRepo");
const uuid = require('uuid');
const { handleGeocode } = require("../utils/geocoder");
const JobFullyCreatedResponse = require("../response/jobFullyCreatedResponse");
const { createJobRequirement } = require("./jobRequirementsService");


const getAllJobTitles = async (req,res) => {
    console.log("this is the job title",req.body.jobTitle)
    let jobTitle = req.body.jobTitle;
    try{
      const response = await getJobTitles(jobTitle);
        res.status(200).send(response);
    }catch(err){
        res.send(err)
    }
}



const getJobPostByBusId = async (req,res) => {
    let id = req.params.id;
    try{
        let response = await getJobPostingByBusinessId(id);
        res.status(200).send(response)
    }
    catch(err){
        console.log(err)
        res.status(err.statusCode).send(err)
    }
    
  
}

const createJobPost = async (req,res) => {
    let jobPost = req.body.jobPost;
    console.log("this is job post",jobPost)
    let address = req.body.address;
   // console.log("this is job post",jobPost)
   // console.log("this is address",address)
    //start off by first saving the job post to the database
    try{
        jobPost = {...jobPost, job_id: uuid.v4()}
        console.log("this is jobpost that will be sent",jobPost)
        let jobPostCreatedResponse = await createNewJobPost(jobPost);
       // console.log("this is job post created response",jobPostCreatedResponse)

        //lets save the each of the requirements in the database
        const requirements = req.body.requirements;
        console.log("this is requirements",requirements)
        for(let i = 0; i < requirements.length; i++){
            let requirement = requirements[i];
            console.log("this is requirement",requirement)
            const reqToSave = {
                job_requirement_id: uuid.v4(),
                job_requirement_name : requirement,
                job_post_id : jobPost.job_id
            }
            console.log("this is req to save",reqToSave)
           
           await createJobRequirement(reqToSave);
        
            
        }




        //now that we have the job post id, we can save the address


        address = {...address, job_address_id: uuid.v4(),job_post_id : jobPost.job_id}
        let addressString = `${address.job_street} ${address.job_city} ${address.job_state_province} ${address.job_postal_code} ${address.job_country}`

        //console.log("this is address string",addressString)
       // console.log("this is address that will be sent",address)
        let testresponse = await handleGeocode(addressString);
       // console.log("this is test response", testresponse)
        const latitude = testresponse[0].latitude;
        const longitude = testresponse[0].longitude;
        address = {...address, job_latitude: latitude, job_longitude : longitude}
        let jobPostAddressCreatedResponse = await createNewJobPostAddress(address);
        
        res.status(200).send(new JobFullyCreatedResponse(jobPostCreatedResponse.jobPost,jobPostAddressCreatedResponse.jobPostAddress));
    }catch(err){
        console.log(err)
        res.send(err)
    }

}
const jobQuery = async (req,res) => {
    console.log(req.query)
    let query = req.query.jobType;
    let location = req.query.location;
    console.log(query);
    try{
        let response = await getJobPostQuery(query);
        res.status(200).send(response)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
}

module.exports = {getJobPostByBusId,createJobPost,jobQuery,getAllJobTitles}