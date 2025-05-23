var mysql = require("mysql");
var express = require("express");
var router = express.Router();

var con = mysql.createConnection({
  host: "64.31.22.34",
  user: "alwhizco_Sagar",
  password: "Asdbnm@123455432$$$$",
  database: "alwhizco_Sagar",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("you are connected");
  }
});

module.exports.signup = function (username, email, password, status, callback) {
  var query =
    "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    status +
    "')";
  con.query(query, callback);
};

module.exports.getuserid = function (email, callback) {
  var query = "select *from verify where email = '" + email + "' ";
  con.query(query, callback);
};

module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};



module.exports.add_appointment = function (
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "insert into appointment (patient_name,department,doctor_name,date,time,email,phone) values ('" +
    p_name +
    "','" +
    department +
    "','" +
    d_name +
    "','" +
    date +
    "','" +
    time +
    "','" +
    email +
    "','" +
    phone +
    "')";
  con.query(query, callback);
};

module.exports.getallappointment = function (callback) {
  var query = "select * from appointment";
  con.query(query, callback);
};

module.exports.getappointmentbyid = function (id, callback) {
  var query = "select * from appointment where id=" + id;
  console.log(query);
  con.query(query, callback);
};

module.exports.editappointment = function (
  id,
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "update appointment set patient_name='" +
    p_name +
    "',department='" +
    department +
    "',doctor_name='" +
    d_name +
    "',date='" +
    date +
    "',time='" +
    time +
    "',email='" +
    email +
    "',phone='" +
    phone +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.deleteappointment = function (id, callback) {
  var query = "delete from appointment where id=" + id;
  con.query(query, callback);
};
//module.exports =router;



module.exports.checktoken = function (token, callback) {
  var query = "select *from temp where token='" + token + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.setpassword = function (id, newpassword, callback) {
  var query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};


module.exports.matchtoken = function (id, token, callback) {
  var query = "select * from `verify` where token='" + token + "' and id=" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.updateverify = function (email, email_status, callback) {
  var query =
    "update `users` set `email_status`='" +
    email_status +
    "' where `email`='" +
    email +
    "'";
  con.query(query, callback);
};


module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  console.log(query);
};


module.exports.get_patient_by_id = function(id, callback) {
  const sql = "SELECT * FROM patients WHERE id = ?";
  con.query(sql, [id], callback);
};
module.exports.update_patient = function(id, name, email, gender, age, phone, roomNumber, isIsolated, symptoms, callback) {
  const sql = "UPDATE patients SET name=?, email=?, gender=?, age=?, phone=?, roomnumber=?, isisolated=?, symptoms=? WHERE id=?";
  con.query(sql, [name, email, gender, age, phone, roomNumber, isIsolated, symptoms, id], callback);
};

module.exports.delete_patient = function(id, callback) {
  const sql = "DELETE FROM patients WHERE id=?";
  con.query(sql, [id], callback);
};



module.exports.getAllRooms = function(callback) {
  const query = "SELECT * FROM rooms ORDER BY room_number";
  con.query(query, callback);
};

module.exports.addRoom = function(room_number, status, callback) {
  con.query("INSERT INTO rooms (room_number, status) VALUES (?, ?)", [room_number, status], callback);
};

module.exports.getRoomById = function(id, callback) {
  con.query("SELECT * FROM rooms WHERE id = ?", [id], callback);
};



module.exports.updateRoom = function(id, room_number, status, callback) {
  con.query("UPDATE rooms SET room_number = ?, status = ? WHERE id = ?", [room_number, status, id], callback);
};

module.exports.deleteRoom = function(id, callback) {
  con.query("DELETE FROM rooms WHERE id = ?", [id], callback);
};



module.exports.get_all_patients = function(callback) {
    var sql = "SELECT * FROM patients";
    con.query(sql, [], callback); 
};

module.exports.add_patient = function(name, email, gender, age, phone, roomNumber, isIsolated, symptoms, callback) {
  var sql = "INSERT INTO patients (name, email, gender, age, phone, roomnumber, isisolated, symptoms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  con.query(sql, [name, email, gender, age, phone, roomNumber, isIsolated, symptoms], callback);
};
