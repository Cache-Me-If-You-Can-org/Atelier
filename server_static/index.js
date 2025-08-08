const path = require("path")
const express = require("express");
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.all("/*", (req, res) => {
  let pathName = req.url;
  console.log(pathName, pathName.length, pathName.lastIndexOf('/'));
  if (pathName.lastIndexOf('/') === pathName.length - 1) {
    pathName = pathName.slice(0,pathName.length - 1);
  }

  let fileName = path.join(__dirname, `./data/${pathName.slice(pathName.lastIndexOf('/')+1)}.json`) ;

  console.log('filename:', fileName);

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({error: `unable to read file ${fileName}`});
    } else {
      console.log(JSON.parse(data));
      res.status(200).json(JSON.parse(data));
    }
  })

})

const PORT = process.env.PORT_STATIC || 3000;//
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);