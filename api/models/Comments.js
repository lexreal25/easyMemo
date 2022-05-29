const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    comments: [
      {
        memoId: {
          type: String,
        },
        comment: {
          message: { type: String },
          from: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
