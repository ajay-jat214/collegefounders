const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
var path = require("path");
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const url = 'mongodb://localhost:27017/database3';
mongoose.connect(process.env.MONGODB_URI||url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log("mongodb is connected")});
const server = http.createServer(app);
var College = require("./schemas/colleges");
var Student = require("./schemas/students");

app.post('/data',(req,res)=>{
    console.log(req.body);
    let body='';
    req.on("data", (chunk) => {
      body += chunk.toString();
      const obj = JSON.parse(body);
      console.log(obj)
      College.find({}, (err, data) => {
          if (err) return res.json("error:server error");
          res.send({data:data,message:'success'});
        });
      })
})

app.post('/studentData',(req,res)=>{
  console.log(req.body);
  let body='';
  req.on("data", (chunk) => {
    body += chunk.toString();
    const obj = JSON.parse(body);
    console.log(obj)
    Student.find({collegeId:obj.collegeId}, (err, data) => {
      if (err) return res.json("error:server error");
      res.send({data:data,message:'success'});
    });
    })
})

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
  
if (process.env.NODE_ENV == "production") {
  app.use(express.static("collegefounders/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "collegefounders", "build", "index.html"));
  });
}
  server.listen(port, "0.0.0.0", () =>
    console.log(`server is running on port ${port}`)
  );
  