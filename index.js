const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 8001;

let timeStamp = new Date().toString();


app.get("/", (req, res) =>
  res.json(`API Endpoints: "/addStamp"- To Add Current TimeStamp, "/getStamp" - To get Added TimeStamps, "/getAllFiles"- To get all Files in a folder`)
);



//API Endpoint to generate current time stamp.
app.post("/addStamp", (req, res) => {
  let add = fs.writeFile("./Text Folder/current-date-time.txt", `${timeStamp}`, { flag: 'a+' }, (err) => {
    if (err) console.log(err);
  });
  res.status(200).send({message: "Stamp added"});
});


//API Endpoint to get the generated time stamp.
app.get("/getStamp", (req, res) => {
  let stamp = fs.readFile("./Text Folder/current-date-time.txt", (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.toLocaleString());
  });
});

//API Endpoint to get all the files from a particular folder.
app.get("/getAllFiles", function (req, res) {
  let filesFolders = [];
  let dir = './Text Folder/';
  if(req.query.path != null){
      dir += `${req.query.path}/`;
      console.log(dir)
  }
  fs.readdir(dir, (err, files) => {
      if (err) { throw err; };
      files.forEach(file => {
          let type = path.extname(file);
          let detail = {"name" : file, "type": type}
          filesFolders.push(detail);
      });
      res.status(200).json({
        directory: dir,
        files: filesFolders
      });
  });
});

app.get("/", (req, res) =>
  res.send(`Server Running`)
);

app.listen(port, () => console.log("App is listening at " + port));
