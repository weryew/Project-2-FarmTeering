const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Farm = require("../models/farm");
const Work = require("../models/work");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/farms/:farmId/farmer/:id", (req, res, next) => {
  User.findById(req.params.id, (err, farmer) => {
    if (err) return next(err);
    res.render("farmer/show", {
      farmer: farmer
    });
  });
});



module.exports = router;
