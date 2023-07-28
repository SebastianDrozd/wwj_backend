const {
  createNewJobApplication,
  getUserJobApplicationsById,
  getBusinessJobApplications,
  getJobApplicationDetails,
  updateJobApplicationViewedStatus,
  updateJobApplicationRejectedStatus,
  getSimpleJobApplicationDetails,
} = require("../repo/jobApplicationRepo");
const uuid = require("uuid");
const { saveUserNotification } = require("../repo/userNotificationsRepo");

const saveJobApplication = async (req, res) => {
  let application = req.body;
  try {
    let id = uuid.v4();
    application = { ...application, job_application_id: id };
    const result = await createNewJobApplication(application);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const getUserJobApplications = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await getUserJobApplicationsById(userId);
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const handleGetBusinessJobApplications = async (req, res) => {
  const businessId = req.params.id;
  console.log("this is id", businessId);
  try {
    const response = await getBusinessJobApplications(businessId);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const handleGetJobApplicationDetails = async (req, res) => {
  const jobApplicationId = req.params.id;
  try {
    console.log("this is id", jobApplicationId);
    const response = await getJobApplicationDetails(jobApplicationId);

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const handleUpdateJobApplicationViewedStatus = async (req, res) => {
  const jobApplicationId = req.params.id;
  console.log("this is id", jobApplicationId);
  try {
    //update the viewed status
    const response = await updateJobApplicationViewedStatus(jobApplicationId);
    console.log(response);
    //create a new notification that the application was viewed
    const jobResponse = await getSimpleJobApplicationDetails(jobApplicationId)
    console.log("this is job response", jobResponse);
    const notification = {
      user_not_id: uuid.v4(),
      user_not_user_id: jobResponse[0].user_id,
      user_not_message: "Your application was recently viewed.",
      user_not_link: `/jobApplication/${jobResponse[0].job_post_id}`,
      user_not_job_id: jobResponse[0].job_post_id,
    };
    console.log("this is notification", notification);
    const notificationResponse = await saveUserNotification(notification);
    console.log("this is notification response", notificationResponse);
    res.status(200).json("Changed job application status to viewed and created notification");
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

const handleUpdateJobApplicationRejectedStatus = async (req, res) => {
  const jobApplicationId = req.params.id;
  try {
    const response = await updateJobApplicationRejectedStatus(jobApplicationId);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  saveJobApplication,
  getUserJobApplications,
  handleGetBusinessJobApplications,
  handleGetJobApplicationDetails,
  handleUpdateJobApplicationViewedStatus,
  handleUpdateJobApplicationRejectedStatus,
};
