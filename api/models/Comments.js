const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    receiver: { type: String, required:true }, //RECEIVERS NAME
    memoId: { type: String, require: true},
    comment: {
      message: { type: String, required:true },
      from: { type: String, required:true }, // SENDERS NAME
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
