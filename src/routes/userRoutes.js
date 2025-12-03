const express = require("express");
const router = express.Router(); // na3ml router bach n9assem routes mta3 users

const authMiddleware = require("../middlewares/authMiddleware"); // middleware bch nverifi JWT
const roleMiddleware = require("../middlewares/roleMiddleware"); // middleware bch nverifi role

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController"); // njib fonctions mel controller user

// GET api users : lmanager bark yjiwib kol users
router.get("/", authMiddleware, roleMiddleware("manager"), getUsers);

// GET api users:id : manager yjiwib kol, user yjiwib nafssou
router.get("/:id", authMiddleware, getUserById);

// PUT apiusers:id : manager wela nafssou ybadlou données
router.put("/:id", authMiddleware, updateUser);

// DELETE api users:id : manager bark ynajjem yfas5 user
router.delete("/:id", authMiddleware, roleMiddleware("manager"), deleteUser);

module.exports = router; // nasaddri router bach nesta3mlouh fil server principal
