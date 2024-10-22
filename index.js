// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

let date = new Date("170000000000");
console.log(date.toUTCString());
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);
  if (isNaN(date.getTime())) {
    if (isNaN(req.params.date)) {
      res.json({error: "Invalid Date"});
    } else {
      req.params.date = parseInt(req.params.date);
      let date2 = new Date(req.params.date);
      res.json({"unix": date2.getTime(), "utc": date2.toUTCString()});
    }
  } else {
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  }
  // let dateArr = req.params.date.split("-");
  // let dateString = dateArr.join("");
  // console.log(dateString);
  // if (isNaN(dateString)) {
  //   res.json({error: "Invalid Date"});
  // } else {
  //   if (dateArr.length > 1) {
  //     var date = new Date(dateArr[0],dateArr[1]-1,dateArr[2]);
  //   } else {
  //     var date = new Date(parseInt(dateArr[0]));
  //   }
  // }
  // res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

app.get("/api", function (req, res) {
  var date = new Date();
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
