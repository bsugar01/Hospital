const express = require('express');
const router = express.Router();
const db = require('../models/db_controller');

// GET: all patients
router.get('/', function(req, res) {
    db.get_all_patients(function(err, result) {
        if (err) return res.send('Error');
        res.render('patients', { patients: result });
    });
});

// GET: add form
router.get('/add', function(req, res) {
    res.render('add_patient');
});

// POST: add patient
// POST: add patient
router.post('/add', function(req, res) {
    const { name, email, gender, age, phone, roomNumber } = req.body;

    // ✅ Handle symptoms array
    const symptoms = Array.isArray(req.body.symptoms)
        ? req.body.symptoms.join(', ')
        : req.body.symptoms || '';

    // ✅ Isolation priority logic
    const redFlags = ['fever', 'cough', 'breathlessness'];
    const isIsolated = redFlags.some(symptom => symptoms.includes(symptom)) ? 1 : 0;

    // ✅ Save to DB (make sure db.add_patient expects symptoms too)
    db.add_patient(name, email, gender, age, phone, roomNumber, isIsolated, symptoms, function(err, result) {
        if (err) {
            console.log("❌ Error adding patient:", err);
            return res.send('Failed');
        }

        console.log("✅ Patient added with isolation:", isIsolated);
        res.redirect('/patients');
    });
});

router.get('/edit/:id', function(req, res) {
  const id = req.params.id;
  db.get_patient_by_id(id, function(err, result) {
    if (err || result.length === 0) return res.send('Patient not found');
    res.render('edit_patient', { patient: result[0] });
  });
});

router.post('/edit/:id', function(req, res) {
  const id = req.params.id;
  const { name, email, gender, age, phone, roomNumber } = req.body;

  const symptoms = Array.isArray(req.body.symptoms)
    ? req.body.symptoms.join(', ')
    : req.body.symptoms || '';

  const isIsolated = ['fever', 'cough', 'breathlessness'].some(symptom =>
    symptoms.includes(symptom)
  ) ? 1 : 0;

  db.update_patient(id, name, email, gender, age, phone, roomNumber, isIsolated, symptoms, function(err) {
    if (err) return res.send("Error updating");
    res.redirect('/patients');
  });
});


router.get('/delete/:id', function(req, res) {
  const id = req.params.id;
  db.delete_patient(id, function(err) {
    if (err) return res.send("Error deleting");
    res.redirect('/patients');
  });
});



module.exports = router;
