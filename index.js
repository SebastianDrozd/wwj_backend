const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const bp = require('body-parser')
var cookies = require("cookie-parser");
app.use(cookies());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use("/api/v1/users", require('./routes/users'));
app.use("/api/v1/jobs", require('./routes/jobPostings'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port:',process.env.PORT || 3000);
});