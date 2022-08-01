const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');

const PORT = 8001;

let timeStamp = new Date().toString();

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
// const folderPath = './Text Folder'
// app.get('/content', function(req, res) {
//   fs.readdirSync(folderPath).map(fileName => {
//     return path.join(folderPath, fileName);
//   });
  
// })

app.listen(PORT, () => console.log("App is listening at " + PORT));
