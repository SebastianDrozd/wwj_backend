const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const bp = require('body-parser')
var cookies = require("cookie-parser");
app.use(cookies());
app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({ extended: true,limit: '50mb' }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use("/api/v1/users", require('./routes/users'));
app.use("/api/v1/jobs", require('./routes/jobPostings'));
app.use("/api/v1/business",  require('./routes/business'));
app.use("/api/v1/location", require('./routes/locationFinder'));
app.use("/api/v1/regUsers", require('./routes/regUsers'));
app.use("/api/v1/jobApplications", require('./routes/jobApplications'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port:',process.env.PORT || 3000);
});