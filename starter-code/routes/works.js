const express = require("express");
const router = express.Router();
const Work = require("../models/work");
const ensureLogin = require("connect-ensure-login");

router.get("/", (req, res, next) => {
  Work.find({}, (err, works) => {
    if (err) return next(err);

    res.render("works/index", {
      title: "Works",
      works: works
    });
  });
});

router.get("/new", (req, res, next) => {
  res.render("works/new", {
    title: "Create a work",
    work: {}
  });
});

router.post("/", (req, res, next) => {
  const workInfo = {
    name: req.body.name,
    description: req.body.description,
    numberOfWorkers: req.body.numberOfWorkers,
    hoursExpected: req.body.hoursExpected,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    _farmer: req.user._id,
    reward: req.body.reward
  };

  const newWork = new Work(workInfo);

  newWork.save(err => {
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
    return res.redirect("/works");
  });
});

router.get("/:workId", (req, res, next) => {
  Work.findById(req.params.workId)
    .populate("_farmer")
    .exec((err, work) => {
      if (err) return next(err);
      res.render("works/show", {
        title: "Work details - " + work.name,
        work: work
      });
    });
});

router.get("/:id/edit", (req, res, next) => {
  Work.findById(req.params.id, (err, work) => {
    if (err) return next(err);
    res.render("works/edit", {
      title: "Edit work - " + work.name,
      work: work
    });
  });
});

router.post("/:id", (req, res, next) => {
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
      res.redirect(`/works/${req.params.id}`);
    }
  );
});

router.post("/:id/delete", (req, res, next) => {
  Work.findByIdAndRemove(req.params.id, (err, work) => {
    if (err) return next(err);
    res.redirect("/works");
  });
});

module.exports = router;
