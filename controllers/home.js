var express = require('express');
var router = express.Router();
var db = require.main.require('./models/db_controller');

// Middleware: Check if user is logged in
router.get('*', function(req, res, next) {
  if (!req.cookies['username']) {
    res.redirect('/login');
  } else {
    next();
  }
});

// GET: Dashboard/Home Page
router.get('/', function(req, res) {
  res.render('home'); // just renders the home.ejs
});

// GET: Profile
router.get('/profile', function(req, res) {
  var username = req.cookies['username'];
  db.getuserdetails(username, function(err, result) {
    res.render('profile.ejs', { list: result });
  });
});

// POST: Update Profile
router.post('/profile', function(req, res) {
  var username = req.cookies['username'];
  db.getuserdetails(username, function(err, result) {
    if (result.length === 0) return res.send("User not found");

    var id = result[0].id;
    var storedPassword = result[0].password;

    if (storedPassword === req.body.password) {
      db.edit_profile(id, req.body.username, req.body.email, req.body.new_password, function(err, updated) {
        if (updated) {
          res.send("Profile edited successfully");
        } else {
          res.send("Update failed");
        }
      });
    } else {
      res.send("Old password did not match");
    }
  });
});

module.exports = router;
