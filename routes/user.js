var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var userModel = require("../models/userModel");

router.get("/", function (req, res, next) {
  userModel.find((err, docs) => {
    if (!err) {
      res.render("users", {
        data: docs,
      });
    } else {
      console.log("Failed to retrieve the Users List: " + err);
    }
  });
});

router.get("/add", function (req, res, next) {
  res.render("users/add", {
    title: "Add New User",
    name: "",
    email: "",
  });
});

router.post("/add", function (req, res, next) {
  req.assert("name", "Name is required").notEmpty(); //Validate name
  req.assert("email", "A valid email is required").isEmail(); //Validate email
  var errors = req.validationErrors();
  if (!errors) {
    var userDetails = new userModel({
      name: req.body.name,
      email: req.body.email,
    });

    userDetails.save((err, doc) => {
      if (!err) req.flash("success", "User added successfully!");
      res.redirect("/users");

      res.render("users/add", {
        title: "Add New User",
        name: user.name,
        email: user.email,
      });
    });
  } else {
    //Display errors to user
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);
    res.render("users/add", {
      title: "Add New User",
      name: req.body.name,
      email: req.body.email,
    });
  }
});

router.get("/edit/(:id)", function (req, res, next) {
  userModel.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("users/edit", {
        title: "Update User Details",
        data: doc,
      });
    } else {
      req.flash("error", "User not found with id = " + req.params.id);
      res.redirect("/users");
    }
  });
});

router.post("/update/:id", function (req, res, next) {
  req.assert("name", "Name is required").notEmpty(); //Validate nam
  req.assert("email", "A valid email is required").isEmail(); //Validate email
  var errors = req.validationErrors();
  if (!errors) {
    var user = {
      name: req.sanitize("name").escape().trim(),
      email: req.sanitize("email").escape().trim(),
    };
    userModel.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
      },

      {
        email: req.body.email,
      },
      function (err, data) {
        if (err) {
          req.flash("error", "Something Goes to Wrong!");
          res.render("users");
        } else {
          req.flash("success", "User has been updated successfully!");
          res.redirect("/users");
        }
      }
    );
  } else {
    //Display errors to user
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);
    /**
     * Using req.body.name
     * because req.param('name') is deprecated
     */
    res.render("users/edit", {
      title: "Edit user",
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
    });
  }
});
// DELETE USER
router.get("/delete/(:id)", function (req, res, next) {
  userModel.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/users");
    } else {
      console.log("Failed to Delete user Details: " + err);
    }
  });
});
module.exports = router;
