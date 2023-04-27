const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 4000;
const databaseLinek = process.env.DATABASE_URL;
// console.log(databaseLinek)

mongoose.connect(databaseLinek).then(() => {
  console.log("DB Connected.");
  app.listen(port, () => {
    console.log(`Server is up at ${port} `);
  });
});
app.use("*", (req, res) => {
  res.status(404).json({
    status: "worong url! 404 not found",
  });
});
