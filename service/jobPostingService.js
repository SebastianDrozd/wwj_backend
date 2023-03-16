const { getJobPostingByBusinessId } = require("../repo/jobPostingRepo");


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

module.exports = {getJobPostByBusId}