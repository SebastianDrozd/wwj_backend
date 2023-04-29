const uuid = require('uuid');
const { saveResume, getUserResumes } = require('../repo/resumeRepo');



const handleSaveResume = async (req, res) => {
    const file = req.file;
    let resumeDto = {
        resume_id: uuid.v4(),
        resume_original_name : file.originalname,
        resume_saved_name : file.filename,
        resume_user_id : req.body.user_id, }
    try{
        const response = await saveResume(resumeDto);
        res.status(200).json(response);
    }catch(error){
        res.status(err.statusCode).json(error);
    }
};

const handleGetUserResumes = async (req, res) => {
    const user_id = req.params.id;
    console.log(user_id)
    try{
        const response = await getUserResumes(user_id);
        res.status(200).json(response);
    }catch(error){
        console.log(error)
    }
   
}


module.exports = {handleSaveResume,handleGetUserResumes}