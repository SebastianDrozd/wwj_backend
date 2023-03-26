const { saveJobRequirement } = require("../repo/jobRequirementsRepo");


const createJobRequirement = async (jobRequirement) => {
    try{
        await saveJobRequirement(jobRequirement);

    }catch(err){
        console.log(err)
    }
};
module.exports = { createJobRequirement };
