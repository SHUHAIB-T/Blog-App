const express = require("express");
const userHelper = require("../helpers/userHelper");
const router = express.Router();

const noCache = (req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
};

const verifyLogin = (req, res, next) => {
  if (req.session.user?.logedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", noCache, verifyLogin, (req, res) => {
  console.log(req.session.user);
  userHelper.getBlog(req.session.user?.user._id).then((blogs) => {
    res.render("user/home", { userData: req.session.user, blogs });
  });
});

router.get("/login", noCache, (req, res) => {
  res.render("user/login", { err: req.session.err });
  delete req.session.err;
});

router.post("/login-form", noCache, (req, res) => {
  console.log(req.body);
  userHelper
    .doLogin(req.body)
    .then((user) => {
      req.session.user = {
        user: user,
        logedIn: true,
      };
      res.redirect("/");
    })
    .catch((err) => {
      req.session.err = {
        message: err,
      };
      res.redirect("/login");
    });
});
router.get("/signup", (req, res) => {
  res.render("user/signup", { err: req.session.err });
  delete req.session.err;
});

router.post("/signup-form", (req, res) => {
  console.log(req.body);
  userHelper
    .createUser(req.body)
    .then(() => {
      console.log("user added");
      res.redirect("/login");
    })
    .catch(() => {
      console.log("email alreaddy used");
      req.session.err = {
        message: "email already used !",
      };
      res.redirect("/signup");
    });
});
router.get("/logout", verifyLogin, (req, res) => {
  console.log("log out");
  req.session.destroy();
  res.redirect("/login");
});
router.get("/new-blog", (req, res) => {
  res.render("user/new-blog", {
    userData: req.session.user,
    alert: req.session.alert,
  });
  delete req.session.alert;
});
router.post("/new-blog", (req, res) => {
  console.log(req.body);
  req.body.userID = req.session.user?.user._id;
  userHelper.creteBlog(req.body).then(() => {
    req.session.alert = {
      message: "blog created succesfully",
    };
    res.redirect("/new-blog");
  });
});
module.exports = router;
