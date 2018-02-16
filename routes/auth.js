const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const saltRounds = 14;
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get(
  "/signup",
  [ensureLoggedOut(), upload.single("profilePhoto")],
  (req, res, next) => {
    res.render("auth/signup");
  }
);

router.post(
  "/signup",
  [ensureLoggedOut(), upload.single("profilePhoto")],
  (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const role = req.body.role;
    const address = req.body.address;
    const profilePhoto = `/uploads/${req.file.filename}`;
    const description = req.body.description;
    
    if (!password) {
      req.flash("error", "Password is required");
      return res.redirect("/signup");
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return next(err);
        const user = new User({
          username,
          password: hash,
          firstname,
          lastname,
          email,
          role,
          address,
          profilePhoto,
          description,
        
        });
        console.log(user);

        user.save(err => {
          if (err) {
            console.log(err);
            if (err.code === 11000) {
              req.flash(
                "error",
                `A user with username ${username} already exists`
              );
              return res.redirect("/signup");
            } else if (user.errors) {
              Object.values(user.errors).forEach(error => {
                req.flash("error", error.message);
              });
              return res.redirect("/signup");
            }
          }
          if (err) return next(err);
          res.redirect("/login");
        });
      });
    });
  }
);

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/logout", ensureLoggedIn(), (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
