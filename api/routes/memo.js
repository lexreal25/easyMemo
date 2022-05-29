const Memo = require("../models/Memo");
const router = require("express").Router();
const path = require("path");
const {
  verifyTokenAndAdmin,
  verifyTokenAuthorization,
} = require("./verifytoken");

//create memo verifyTokenAndAuthorization
// router.post("/memo", async (req, res) => {
//   const file = req.files.myfile;
//   const filepath = path.join(__dirname, "..", "images");
//   return file.mv(`${filepath}/${file.name}`, (err) => {
//     if (err) console.log("file was not uploaded");
//    return res.send({ message: "file upload successful" });
//   });
// });

router.post("/memos", async (req, res) => {
const newMemo = new Memo(req.body)
  try {
    const memo = await newMemo.save();
    res.status(200).json(memo)
  } catch (err) {
    res.json(err)
  }
})

//update memo
router.put("/memo/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const updatedMemo = await Memo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all memo
router.get("/",  async (req, res) => {
  try {
    const memos = await Memo.find();
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
