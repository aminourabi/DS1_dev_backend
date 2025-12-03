const express = require("express");
const router = express.Router(); // heni na3ml router bch na9sam routes mta3 auth

const { register, login } = require("../controllers/authController"); 
// heni njib les fonctions register w login mel controller

router.post("/register", register); // route POST :register tsajjel user jdiiid
router.post("/login", login);       // route POST :login ta3mil connexion l user

module.exports = router; // nhott router bch nesta3mlouh fil server principal
