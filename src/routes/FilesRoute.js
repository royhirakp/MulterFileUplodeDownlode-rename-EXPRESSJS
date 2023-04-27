const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const FileModel = require("../Model/File");
const path = require("path");

// FileStore IMAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/file");
  },
  filename: (req, file, cb) => {
    // console.log(Date.now() + file.originalname, "=== from storage ")
    cb(null, Date.now() + file.originalname);
  },
});
const uplode = multer({ storage: storage });

router.post("/file", uplode.single("file"), async (req, res) => {
  // console.log(req.body.title,'req.body', req.body.author, "author")
  // console.log(req.file.mimetype,'req.file')
  // console.log('working auth complit')
  // res.send({m:"workingg auth"})
  try {
    // console.log('public/file/' + req.file.filename, "===== uplode tyr block")
    const file = await FileModel.create({
      title: req.body.title,
      author: req.body.author,
      // path: req.file.path,
      // mimetype: req.file.mimetype,
      FileUrl: req.file.path,
      file: {
        data: fs.readFileSync("public/file/" + req.file.filename),
        contentType: req.file.mimetype + "",
      },
      user: req.userID,
    });
    console.log("type 2");
    res.json({
      status: "sucsess",
      file,
    });
  } catch (error) {
    console.log("type 3 error ");
    res.status(500).json({
      status: "error",
      messege: error.messege,
    });
  }
});

router.get("/file/:id", async (req, res) => {
  console.log("working");
  // let data = await FileModel.findById({_id:req.params.id}) //findById
  //   // ,(err,data)=>{}
  //   // if(err){
  //   //   console.log(err)
  //   // }else{
  //   //   console.log(data)
  //   //   var x = __dirname + '/public/' + data[0]
  //   // }}
  //   // )
  //   console.log(data.__proto__)
  //   res.attachment("firstfile")
  //     // data.downloadStream(res)
  //     // data.d
  // res.send({
  //   data
  // })
  // Router.get('/file/:id', async (req, res) => {
  try {
    const item = await FileModel.findById({ _id: req.params.id });
    // console.log(file);
    // res.set({
    //   "Content-Type": file.mimetype,
    // });
    // res.send({ file });
    const file = item.FileUrl;
    const filePath = path.join(__dirname, `../../${file}`);
    res.download(filePath);

    // res.sendFile(path.join(__dirname, "..", file.path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});
// })

module.exports = router;
