const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//create user
router.post("/register", async (req, res) => {
  const { name, role, id, signature } = req.body;

  const newUser = new User({
    role,
    name,
    id,
    signature,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });
  try {
    //check if user exist
    if (req.body.id !== (await User.findOne({ id: req.body.id }))) {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } else {
      res.status(403).json("user exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.body.id });
    !user && res.status(401).json("Incorrect ID");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const InitialPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    InitialPassword !== req.body.password &&
      res.status(401).json("Wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_SEC,
      { expiresIn: "2d" }
    );
    console.log(user._doc);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;