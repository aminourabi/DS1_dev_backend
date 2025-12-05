const express = require("express"); 
// hni njib express bach na3mlou router

const router = express.Router(); 
// na3ml router bach n9assem routes mta3 tasks

const authMiddleware = require("../middlewares/authMiddleware"); 
// middleware bach yverify token w ychouf ken user connecté

const roleMiddleware = require("../middlewares/roleMiddleware"); 
// middleware bach yverify role (manager wella user)

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController"); 
// hni njib functions mel controller Task


// Create Task 
router.post("/", authMiddleware, roleMiddleware("manager"), createTask); 
// route باش tsna3 task jdida, ken manager bark ynejm


// Get all tasks 
router.get("/", authMiddleware, getTasks); 
// manager yshof kol tasks, user yshof kan mta3ou


// Get single task
router.get("/:id", authMiddleware, getTaskById); 
// nraj3ou task wahed b id mte3ou


// Update Task
router.put("/:id", authMiddleware, roleMiddleware("manager"), updateTask); 
// update task ken manager bark


// Delete Task
router.delete("/:id", authMiddleware, roleMiddleware("manager"), deleteTask); 
// suppr task ken manager bark

module.exports = router; 
// nexportiw router bach nist3mlouh fi app principal
