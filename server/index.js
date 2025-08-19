const path = require("path")
const express = require("express");
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/reviews/sort", (req,res) => {
 let newQuery={
    page: '1',
    count: '9999',
    sort: req.query.sort,
    product_id: req.query.product_id
  }
  let countNum =req.url.indexOf('count=')+6;
  let pageNum =req.url.indexOf('page=')+5;

  let newUrl=req.url.slice(0,countNum)+'9999'+req.url.slice(req.url.indexOf('&',countNum));
  newUrl=newUrl.slice(0,pageNum)+'1'+newUrl.slice(newUrl.indexOf('&',pageNum));
  newUrl='/reviews/'+newUrl.slice(newUrl.indexOf('?'));

  axios( {
    method: req.method,
    url: `${process.env.API_URL}${newUrl}`,
    headers: { Authorization: `${process.env.AUTH_TOKEN}`, 'Content-Type': req.header('Content-Type') },
    params: req.params,
    query: newQuery,
    data: req.body
  })
  .then((data) => {
    if (!req.query.sort) {
      res.send(data.data);
      return;
    }

    let sortType = req.query.sort;
    let pageData=data.data.results.slice(0);

    if (req.query.filters) {
      pageData = pageData.filter((r) => req.query.filters.includes(''+r.rating));
    }

    if(sortType === 'newest') {
      pageData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if(sortType === 'helpful') {
      pageData.sort((a, b) => b.helpfulness - a.helpfulness);
    }

    if(sortType === 'relevant') {
      pageData.sort((a, b) => {
        if (b.helpfulness !== a.helpfullness) {
          return a.helpfulness - b.helpfulness;
        }
        return new Date(b.date) - new Date(a.date);
      })
    }

    let start = (req.query.page-1)*req.query.count;
    let end = start + 1 * req.query.count;

    data.data.results=pageData.slice(start, end);

    data.data.page = req.query.page * req.query.count;
    data.data.count = req.query.count;

    res.send(data.data);

  })
  .catch((error) => {
    console.log('ERR',error);
    res.sendStatus(error.status);
  })
})


app.all("/*", (req, res) => {
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
    console.log('ERR',error);
    res.sendStatus(error.status);
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);