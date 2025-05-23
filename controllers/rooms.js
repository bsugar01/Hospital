var express = require('express');
var router = express.Router();
var db = require('../models/db_controller');

// GET: View room availability
router.get('/', function(req, res) {
  db.getAllRooms(function(err, rooms) {
    if (err) return res.send("Error loading rooms");
    res.render('rooms', { rooms });
  });
});


router.get('/add', function(req, res) {
  res.render('add_room');
});

// POST add room
router.post('/add', function(req, res) {
  const { room_number, status } = req.body;
  db.addRoom(room_number, status, () => res.redirect('/rooms'));
});

// GET edit form
router.get('/edit/:id', function(req, res) {
  db.getRoomById(req.params.id, function(err, result) {
    if (err || result.length === 0) return res.send("Room not found");
    res.render('edit_room', { room: result[0] });
  });
});

// POST update room
router.post('/edit/:id', function(req, res) {
  const { room_number, status } = req.body;
  db.updateRoom(req.params.id, room_number, status, () => res.redirect('/rooms'));
});

// GET delete room
router.get('/delete/:id', function(req, res) {
  db.deleteRoom(req.params.id, () => res.redirect('/rooms'));
});

module.exports = router;
