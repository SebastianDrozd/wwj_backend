const DELETE_RESUME = "DELETE FROM resumes WHERE resume_id = ?";
const EDIT_RESUME = "UPDATE resumes SET resume_original_name = ? WHERE resume_id = ?";

module.exports = { DELETE_RESUME,EDIT_RESUME };