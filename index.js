const express = require('express');
require('dotenv').config();
const app = express();
const bp = require('body-parser')
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api/v1/users", require('./routes/users'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port:',process.env.PORT || 3000);
});