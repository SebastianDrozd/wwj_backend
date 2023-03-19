const { createNewJobPostAddress } = require("../repo/jobPostAddressRepo");
const { getJobPostingByBusinessId, createNewJobPost } = require("../repo/jobPostingRepo");


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
    let address = req.body.address;
    //start off by first saving the job post to the database
    try{
        let jobPostCreatedResponse = await createNewJobPost(jobPost);
        //now that we have the job post id, we can save the address
        address.job_post_id = jobPostCreatedResponse.jobPost.id;
        let jobPostAddressCreatedResponse = await createNewJobPostAddress(address);
        res.status(200).send(new JobFullyCreatedResponse(jobPostCreatedResponse.jobPost,jobPostAddressCreatedResponse.jobPostAddress));
    }catch(error){
        res.status(err.statusCode).send(err)
    }

}

module.exports = {getJobPostByBusId,createJobPost}