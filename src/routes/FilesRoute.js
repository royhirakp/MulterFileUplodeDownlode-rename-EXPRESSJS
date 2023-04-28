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
    cb(null, Date.now() + file.originalname);
  },
});
const uplode = multer({ storage: storage });

// delete

router.delete("/file/:id", async (req, res) => {
  try {
    const items = await FileModel.deleteOne({ _id: req.params.id });
    res.status(202).json({
      arrlength: items.length,
      items,
    });
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

//rename

router.put("/file/:id", async (req, res) => {
  try {
    const items = await FileModel.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.status(200).json({
      arrlength: items.length,
      items,
    });
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

//getAll data
router.get("/file", async (req, res) => {
  try {
    const items = await FileModel.find({ user: req.userID });
    res.json({
      arrlength: items.length,
      items,
    });
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

router.post("/file", uplode.single("file"), async (req, res) => {
  try {
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
    res.json({
      status: "sucsess",
      file,
    });
  } catch (error) {
    // console.log("type 3 error ");
    res.status(500).json({
      status: "error",
      messege: error.messege,
    });
  }
});

router.get("/file/downlode/:id", async (req, res) => {
  try {
    const item = await FileModel.findById({ _id: req.params.id });
    const file = item.FileUrl;
    const filePath = path.join(__dirname, `../../${file}`);
    res.download(filePath);
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

module.exports = router;
