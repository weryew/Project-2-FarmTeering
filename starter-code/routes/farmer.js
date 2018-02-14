const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/farms/:farmId/farmer/:id", (req, res, next) => {
  User.findById(req.params.id, (err, farmer) => {
    if (err) return next(err);
    res.render("farmer/show", {
      //title: "Farmer details - " + farmer.firstname,
      farmer: farmer
    });
  });
});

module.exports = router;
