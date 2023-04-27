const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FileSchama = new Schema({
  title: String,
  author: String,
  path: String,
  mimetype: String,
  FileUrl: String,
  file: {
    data: Buffer,
    contentType: String,
  },
  user: { type: ObjectId, ref: "user" },
});

const FileModel = mongoose.model("files", FileSchama);
module.exports = FileModel;
