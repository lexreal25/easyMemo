const router = require("express").Router();
const Comment = require("../models/Comments");

//create new comment
router.post("/", async (req, res, next) => {
  const newComment = new Comment(req.body);
  try {
    const comment = await newComment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(401).json("Please add empty fields");
  }
});

//upddate comment
router.put("/comment/:id", async (req, res, next) => {
  try {
    const updatedComment = await Comment.findById(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(401).json(err);
  }
});

//get all comments
router.get("/", async (req, res, next) => {
  try{
    const comment = await Comment.find();
    res.status(200).json(comment)
  }catch(err){
    res.json(401).json("no comments found")
  }
})
module.exports = router;