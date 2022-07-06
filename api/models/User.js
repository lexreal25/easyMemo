const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, require: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  signature:{type:String},
  admin:{type: Boolean, default:false}
}, {timestamps:true});

module.exports  = mongoose.model("User", userSchema)