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
const server = http.createServer(app);
app.use(express.urlencoded({ extended: false }));
const { MONGOURI } = require("./config/keys");
var student = require("./schemas/students");
var college = require("./schemas/colleges");

app.post("/data", (req, res) => {
  // const cstate = [
  //   "Madhya Pradesh",
  //   "Maharashtra",
  //   "Rajasthan",
  //   "Gujarat",
  //   "Uttar Pradesh",
  //   "Punjab",
  //   "Haryana",
  // ];
  // const ccity = [
  //   ["Indore", "Gwalior", "Bhopal"],
  //   ["Pune", "Mumbai", "Nashik"],
  //   ["Jaipur", "Kota", "Udaipur"],
  //   ["Surat", "Ahmedabad", "Rajkot"],
  //   ["Prayagraj", "Agra", "Kanpur"],
  //   ["Amritsar", "Ludhiana", "Patiala"],
  //   ["Gurugram", "Panipat", "Rohtak"],
  // ];
  // const ccourses = [
  //   "Computer Science",
  //   "Electrical Engineering",
  //   "Mechanical Engineering",
  //   "Civil Engineering",
  //   "Information Technology",
  // ];
  // arr = [];
  // for (i = 1; i <= 100; i++) {
  //   cname = "College" + (i < 10 ? "0" + i : i);
  //   id = "Collegeid" + (i < 10 ? "0" + i : i);
  //   yearFounded = Math.floor(Math.random() * 50 + 1950);
  //   b = Math.floor(Math.random() * 5) + 2;
  //   coursesOffered = ccourses.slice(0, b);
  //   a = Math.floor(Math.random() * 7);
  //   aa = Math.floor(Math.random() * 3);
  //   city = ccity[a][aa];
  //   state = cstate[a];
  //   country = "India";
  //   studentStrength = 0;
  //   aob = new college({
  //     name: cname,
  //     id,
  //     city,
  //     state,
  //     country,
  //     yearFounded,
  //     studentStrength,
  //     coursesOffered,
  //   });
  //   //arr.push(aob);
  //   aob
  //     .save()
  //     .then((a) => console.log("saved " + i + "\n"))
  //     .catch((a) => console.log("error " + i + a + "\n"));
  //   console.log(a + " " + aa + " " + city + "\n");
  // }

  // college
  //   .find({})
  //   .sort("name")
  //   .then((a) => {
  //     a.map((item) => {
  //       console.log(item.name + "\n");
  //     });
  //   });

  college.find({}, (err, data) => {
    if (err) return res.json("error:server error");
    {
      res.json({ data: data, message: "success" });
    }
  });
});

app.post("/studentData", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string

    const obj = JSON.parse(body);
    const { collegeId } = obj;
    // sskills = [
    //   "C",
    //   "C++",
    //   "JAVA",
    //   "JAVASCRIPT",
    //   "PHP",
    //   "SCALA",
    //   "HADOOP",
    //   "PYTHON",
    //   "SQL",
    //   "CSS",
    //   "HTML",
    // ];
    // for (i = 1; i <= 100; i++) {
    //   cname = "College" + (i < 10 ? "0" + i : i);
    //   college.findOne({ name: cname }).then(function (data) {
    //     n = data.coursesOffered.length;
    //     coursesOffered = data.coursesOffered;
    //     studentsum = 0;
    //     arr = [];
    //     for (j = 0; j < n; j++) {
    //       nstu = Math.floor(Math.random() * 10 + 50);
    //       studentsum += nstu;
    //       for (k = 0; k < nstu; k++) {
    //         name = "Student" + k + "c" + i + j;
    //         yearFounded = Math.floor(Math.random() * 4) + 2020;
    //         id = "Stu" + k + "clg" + i + "br" + j;
    //         batch = coursesOffered[j];
    //         collegeId = data.id;
    //         a = Math.floor(Math.random() * 10);
    //         b = Math.min(a + 3, 10);
    //         skills = sskills.slice(a, b);

    //         s = new student({
    //           name,
    //           id,
    //           batch,
    //           yearFounded,
    //           collegeId,
    //           skills,
    //         });
    //         arr.push(s);
    //       }
    //     }
    //     console.log("student saved");
    //     student
    //       .insertMany(arr)
    //       .then((a) => console.log("saved"))
    //       .catch((a) => console.log("error " + a + "\n"));

    //     data
    //       .save()
    //       .then((a) => console.log("data saved " + i + "\n"))
    //       .catch((a) => console.log("error" + a + "\n"));
    //   });
    // }
    student.find({ collegeId: collegeId }, (err, data) => {
      if (err) return res.json("error:server error");
      console.log(data);
      res.json({ data: data, message: "success" });
    });
  });
});

mongoose.connect(
  process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.MONGOLAB_URI ||
    "mongodb+srv://Ajay:@Ajstyles89@cluster0.yxlvh.mongodb.net/mydatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log("connected to database");
  }
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.disable("etag");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("collegefounders/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "collegefounders", "build", "index.html")
    );
  });
}
server.listen(port, "0.0.0.0", () =>
  console.log(`server is running on port ${port}`)
);
