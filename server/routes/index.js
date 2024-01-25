var express = require("express");
var router = express.Router();

const phones = require("../data/phones.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.status(200).json(phones);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const phone = phones.find((phone) => phone.id.toString() === id.toString());

  if (phone) {
    return res.status(200).json(phone);
  } else {
    return res.status(400).json("The provided phone doesn't exist.");
  }
});

module.exports = router;
