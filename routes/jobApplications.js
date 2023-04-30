const {
  saveJobApplication,
  getUserJobApplications,
  handleGetBusinessJobApplications,
  handleGetJobApplicationDetails,
  handleUpdateJobApplicationViewedStatus,
  handleUpdateJobApplicationRejectedStatus,
} = require("../service/jobApplicationService");

const router = require("express").Router();

router.post("/", (req, res) => {
  saveJobApplication(req, res);
});


router.get("/users/:id", (req, res) => {
  getUserJobApplications(req, res);
});

//@desc     Get Recent Job Applications
//@route    GET /api/v1/jobApplications/business/:businessId
//@access   Private

router.get("/business/:id", (req, res) => {
  handleGetBusinessJobApplications(req, res);
});

//@desc     Get Full Job Application Details
//@route    GET /api/v1/jobApplications/:jobapplicationId
//@access   Private

router.get("/:id",(req,res) => {
  handleGetJobApplicationDetails(req,res);
} )

//@desc     Update the viewed Status of application to have been viewed
//@route    POST /api/v1/jobApplications/:jobapplicationId/viewed
//@access   Private

router.post("/:id/viewed", (req, res) => {
  handleUpdateJobApplicationViewedStatus(req, res);
});

//@desc     Update the viewed Status of application have been rejected by the business owner
//@route    POST /api/v1/jobApplications/:jobapplicationId/rejected
//@access   Private

router.post("/:id/rejected", (req, res) => {
  handleUpdateJobApplicationRejectedStatus(req, res);
});



module.exports = router;
