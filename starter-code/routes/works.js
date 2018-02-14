const express = require("express");
const router = express.Router();
const Work = require("../models/work");
const Farm = require("../models/farm");
const ensureLogin = require("connect-ensure-login");

router.get("/farms/:farmId/works/", (req, res, next) => {
  console.log(req.params.farmId);
  Farm.findById(req.params.farmId)
    .populate("works")
    .exec((err, farm) => {
      if (err) return next(err);
      res.render("works/index", {
        works: farm.works,
        farmId: req.params.farmId,
        farm: farm
      });
    });
});

router.get("/farms/:id/works/new", (req, res, next) => {
  res.render("works/new", {
    title: "Create a work",
    farmId: req.params.id,
    work: {}
  });
});

router.post("/farms/:farmId/works/", (req, res, next) => {
  const workInfo = {
    name: req.body.name,
    description: req.body.description,
    numberOfWorkers: req.body.numberOfWorkers,
    hoursExpected: req.body.hoursExpected,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    _farm: req.params.farmId,
    reward: req.body.reward
  };
  const newWork = new Work(workInfo);

  newWork.save((err, work) => {
    if (newWork.errors) {
      return res.render("works/new", {
        title: "Create a work",
        errors: newWork.errors,
        work: newWork
      });
    }
    if (err) {
      return next(err);
    }
    Farm.findByIdAndUpdate(
      req.params.farmId,
      { $push: { works: work._id } },
      err => {
        if (err) return next(err);
        return res.redirect(`/farms/${req.params.farmId}/works`);
      }
    );
  });
});

router.get("/farms/:farmId/works/:workId", (req, res, next) => {
  Work.findById(req.params.workId)
    .populate("_farm")
    .exec((err, work) => {
      if (err) return next(err);
      res.render("works/show", {
        title: "Work details - " + work.name,
        work: work,
        farmId: req.params.farmId
      });
    });
});

router.get("/farms/:farmId/works/:id/edit", (req, res, next) => {
  Work.findById(req.params.id, (err, work) => {
    if (err) return next(err);
    res.render("works/edit", {
      title: "Edit work - " + work.name,
      work: work,
      farmId: req.params.farmId
    });
  });
});

router.post("/farms/:farmId/works/:id", (req, res, next) => {
  Work.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      numberOfWorkers: req.body.numberOfWorkers,
      hoursExpected: req.body.hoursExpected,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reward: req.body.reward
    },
    (err, work) => {
      if (err) return next(err);
      res.redirect(`/farms/:farmId/works/${req.params.id}`);
    }
  );
});

router.post("/farms/:farmId/works/:id/delete", (req, res, next) => {
  let farmId = req.params.farmId;
  Work.findByIdAndRemove(req.params.id, (err, work) => {
    if (err) return next(err);
    res.redirect(`/farms/${farmId}/works`);
  });
});

module.exports = router;
