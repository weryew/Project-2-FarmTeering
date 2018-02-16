const express = require("express");
const router = express.Router();
const Farm = require("../models/farm");
const ensureLogin = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/",ensureLoggedIn(), (req, res, next) => {
  Farm.find({}, (err, farms) => {
    if (err) return next(err);
    res.render("farms/index", {
      title: "farms",
      farms: farms
    });
  });
});

router.get(
  "/new",
  [ensureLoggedIn(), upload.single("img")],
  (req, res, next) => {
    res.render("farms/new", {
      title: "Create a farm",
      farm: {}
    });
  }
);

router.post("/", [ensureLoggedIn(), upload.single("img")], (req, res, next) => {
  const farmInfo = {
    name: req.body.name,
    img: `/uploads/${req.file.filename}`,
    address: req.body.address,
    description: req.body.description,
    _owner: req.user._id
  };
  const newFarm = new Farm(farmInfo);

  newFarm.save(err => {
    if (newFarm.errors) {
      return res.render("farms/new", {
        title: "Create a farm",
        errors: newFarm.errors,
        farm: newFarm
      });
    }
    if (err) {
      return next(err);
    }
    return res.redirect("/farms");
  });
});

router.get("/:farmId",ensureLoggedIn(), (req, res, next) => {
  Farm.findById(req.params.farmId)
    .populate("_owner")
    .exec((err, farm) => {
      if (err) return next(err);
      res.render("farms/show", {
        title: "Farm details - " + farm.name,
        farm: farm
      });
    });
});

router.get("/:id/edit", ensureLoggedIn(),(req, res, next) => {
  Farm.findById(req.params.id, (err, farm) => {
    if (err) return next(err);
    res.render("farms/edit", {
      title: "Edit farm - " + farm.type,
      farm: farm
    });
  });
});

router.post("/:id", ensureLoggedIn(),(req, res, next) => {
  Farm.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
      description: req.body.description
    },
    (err, farm) => {
      if (err) return next(err);
      res.redirect(`/farms/${req.params.id}`);
    }
  );
});

router.post("/:id/delete", ensureLoggedIn(),(req, res, next) => {
  Farm.findByIdAndRemove(req.params.id, (err, farm) => {
    if (err) return next(err);
    res.redirect("/farms");
  });
});

module.exports = router;
