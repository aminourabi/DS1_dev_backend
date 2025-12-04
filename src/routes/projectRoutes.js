const express = require("express");
// hni jibna express bach na3mlou router

const router = express.Router();
// na3ml router bach n9assem routes mta3 projects

const authMiddleware = require("../middlewares/authMiddleware");
// middleware bach ychouf token w yverifi kan user connecté

const roleMiddleware = require("../middlewares/roleMiddleware");
// middleware bach ychouf role (manager / user)

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectController");
// hni jibna les fonctions mte3 controller project


// Create project → manager only
router.post("/", authMiddleware, roleMiddleware("manager"), createProject);
// route bach tsna3 projet jdid ken manager bark ynejm


// Get all projects manager sees all, user sees own
router.get("/", authMiddleware, getProjects);
// hni nraj3ou projets manager yshof kol chy user yshof kan mte3ou


// Get single project
router.get("/:id", authMiddleware, getProjectById);
// nraj3ou projet wahed b id mte3ou


// Update project → manager only
router.put("/:id", authMiddleware, roleMiddleware("manager"), updateProject);
// update projet ynejm y3mlha ken manager


// Delete project  manager only
router.delete("/:id", authMiddleware, roleMiddleware("manager"), deleteProject);
// suppr projet w hedhi ken manager y3mlha

module.exports = router;
// nexportiw router bach nist3mlouh fi app principal
