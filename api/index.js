const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const memoRoute = require("./routes/memo")
// const expressfileuploader = require("express-fileupload");
const app = express();

const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
// app.use(expressfileuploader)
//app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/memo",memoRoute)

app.listen(process.env.PORT || 4000, () => console.log("Backend is running!"));
