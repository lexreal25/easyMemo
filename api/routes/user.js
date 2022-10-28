const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  verifyTokenAndAdmin,
  verifyTokenAuthorization,
} = require("./verifytoken");

//update user
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  let { password } = req.body;
  if (password) {
    password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete user
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER verifyTokenAuthorization
router.get("/",async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(10)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
