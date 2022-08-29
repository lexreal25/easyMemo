const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    receiver: { type: String }, //RECEIVERS NAME
    memoId: { type: String, require: true},
    comment: {
      message: { type: String },
      from: { type: String }, // SENDERS NAME
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
