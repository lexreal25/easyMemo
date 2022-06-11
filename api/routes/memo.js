const Memo = require("../models/Memo");
const router = require("express").Router();
const path = require("path");
const {
  verifyTokenAndAdmin,
  verifyTokenAuthorization,
} = require("./verifytoken");


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
