const mongoose = require("mongoose");

const memoSchema = mongoose.Schema(
  {
    id: { type: String, require: true },
    to: { type: String, require: true },
    through: { type: String },
    from: { type: String, require: true },
    date: { type: Date, require: true },  
    copy: { type: String},
    files: { type: Array },
    signature: { type: String, require: true },
    content: { type: String, require: true },
    comment: [{
      memoId:{
        type: String
      },
      message:{
        type:String
      },
      by:{
         type:String
      }
    }, {timeStamps:true}],
    name: { type: String },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("Memo", memoSchema);
