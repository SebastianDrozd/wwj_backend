const uuid = require('uuid');
const { saveResume, getUserResumes, deleteUserResume, editUserResume } = require('../repo/resumeRepo');



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
        console.log("resume deleted")
        res.status(200).json(response);
    }catch(error){
        console.log(error)
    }
   
}

const handleDeleteUserResume = async (req, res) => {
    const resumeId = req.params.id;
    try{
        const response = await deleteUserResume(resumeId);
        res.status(200).json(response);
       
    }catch(error){
        console.log(error)
        res.send(error)
    }
};

const handleEditUserResume = async (req, res) => {
    const resumeId = req.params.id;
    const newName = req.body.newName;
    console.log(req.body)
    try{
        const response = await editUserResume(newName,resumeId);
        res.status(200).json(response);
    }catch(error){
        console.log(error)
        res.send(error)
    }
}


module.exports = {handleSaveResume,handleGetUserResumes,handleDeleteUserResume,handleEditUserResume}