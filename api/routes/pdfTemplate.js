const router = require("express").Router();
const pdf = require("html-pdf");
const template = require("../documents");
const path = require("path")
//create pdf
router.post("/createpdf", async (req, res) => {
  // const memo = await Memo.findById(req.params.id);
  pdf.create(template(req.body), {}).toFile("memo.pdf", (err) => {
    if (err) {
       res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
})

//get pdf
router.get("/fetchpdf", (req, res) => {
  res.sendFile(path.join(__dirname,'../memo.pdf'))
});
module.exports = router;
