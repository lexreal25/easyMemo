const Memo = require("../models/Memo");
const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAuthorization,
} = require("./verifytoken");

//create memo
router.post("/memos",verifyTokenAuthorization, async (req, res) => {
const newMemo = new Memo(req.body)
  try {
    const memo = await newMemo.save();
    res.status(200).json(memo);
  } catch (err) {
    res.json(err);
  }
});

//update memo
verifyTokenAuthorization;
router.put("/update/:id",verifyTokenAuthorization, async (req, res) => {
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

//get memo by receiver id
router.get("/mymemos/:to", verifyTokenAuthorization, async (req, res, next) => {
  try {
    const mymemos = await Memos.find(req.params.to).sort({ _id: -1 });
    res.status(200).json(mymemos);
  } catch (error) {
    res.status(401).json("No memo found");
  }
});
//get all memo
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const memos = query
      ? await Memo.find().sort({ _id: -1 }).limit(20)
      : await Memo.find().sort({ _id: -1 });
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
