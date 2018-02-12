const express = require("express");
const router = express.Router();

//index
router.get("/", (req, res, next) => {
  res.render("index");
});

//more information
router.get("/moreInfo", (req, res, next) => {
  res.render("info");
});

//work list
router.get("/workList", (req, res, next) => {
  res.render("workList");
});
module.exports = router;
