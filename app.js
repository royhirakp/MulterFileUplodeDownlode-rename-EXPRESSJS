const express = require("express");
const userRouten = require("./src/routes/UserRoute");
const FileRoute = require("./src/routes/FilesRoute");
// const gmseasion = require("./src/routes/GmSeasion");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const Auth = require("./src/auth/auth");
app.use("/file", Auth);
app.use(userRouten);
app.use(FileRoute);

// youtubee
// const YoutuneRoute = require("./src/routes/youtubeRoutes");
// app.use("/api/v1/item", YoutuneRoute);

const AggRoute = require("./src/routes/AggrigationR");
app.use(AggRoute);
app.use("/", (req, res) => {
  res.send("hello ");
});

module.exports = app;
