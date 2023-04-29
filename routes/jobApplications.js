const {
  saveJobApplication,
  getUserJobApplications,
  handleGetBusinessJobApplications,
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

module.exports = router;
