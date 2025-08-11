const path = require("path")
const express = require("express");
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.all("/*", (req, res) => {
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.params);
  // console.log('query', req.query);
  // console.log('body', req.body);
  axios( {
    method: req.method,
    url: `${process.env.API_URL}${req.url}`,
    headers: { Authorization: `${process.env.AUTH_TOKEN}`, 'Content-Type': req.header('Content-Type') },
    params: req.params,
    query: req.query,
    data: req.body
  })
  .then((data) => {
    res.send(data.data);
  })
  .catch((error) => {
    // console.log('ERR',error);
    res.sendStatus(error.status);
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);