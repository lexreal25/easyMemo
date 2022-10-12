const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const memoRoute = require("./routes/memo");
const pdfRoute = require("./routes/pdfTemplate");
const commentRoute = require("./routes/comment");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DBConnection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/memo", memoRoute);
app.use("/api/comment", commentRoute);
app.use("/api/pdf", pdfRoute);
app.listen(process.env.PORT || 4000, () => console.log("Backend is running!"));
