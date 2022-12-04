const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
  {
    id: { type: String, require: true, unique: true },
    sender: { type: String, require: true },
    to: { type: String, require: true },
    through: { type: String },
    from: { type: String, require: true },
    date: { type: Date, require: true },
    copy: { type: String },
    files: [
      {
        file_name: { type: String },
        url: { type: String },
      },
    ],
    signature: { type: String, require: true },
    content: { type: String, require: true },
    subject: { type: String, require: true },
    status: { type: String, default: "Pending" },
    approvedby: { type: String, timeStamps: true },
    new: { type: Boolean, default: true },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("Memo", memoSchema);
