const Project = require("../models/Project"); // njib model Project bch nesta3mlouh fil CRUD

// Create Project (manager only)
exports.createProject = async (req, res) => {
    try {
        const { nom, description, statut } = req.body; // njib data mte3 project mel body

        const newProject = await Project.create({
            nom,                    // esm project
            description,            // description mte3ou
            statut,                 // etat mte3 project
            proprietaire: req.user.id // manajjer houwa elli ykhal9 project → propriétaire howa user connecté
        });

        res.status(201).json({ message: "Project créé", project: newProject }); // nraj3ou project jdiiid
    } catch (error) {
        res.status(500).json({ message: error.message }); // ken saret erreur
    }
};

// Get all projects (manager sees all, user sees only own)
exports.getProjects = async (req, res) => {
    try {
        let projects;

        // manager ychouf barcha projects
        if (req.user.role === "manager") {
            projects = await Project.find()
                .populate("proprietaire", "nom login role"); // nzid info mta3 propriétaire
        } else {
            // user ordinaire ychouf khdemtou bark
            projects = await Project.find({ proprietaire: req.user.id });
        }

        res.json(projects); // nraj3ou liste
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("proprietaire", "nom login role");

        if (!project) 
            return res.status(404).json({ message: "Project introuvable" });

        // access control: user ma ychoufsch project ghair mte3ou
        if (req.user.role !== "manager" &&
            project.proprietaire._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        res.json(project); // nraj3ou project elli tlabtou
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Project (manager only)
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) 
            return res.status(404).json({ message: "Project introuvable" });

        // hedhi elmourour: ken manager bark ybadlou
        if (req.user.role !== "manager") {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const { nom, description, statut } = req.body;
        project.nom = nom || project.nom;                 // ken jani nom jdiiid
        project.description = description || project.description;
        project.statut = statut || project.statut;

        await project.save(); // nsajlou taghyir
        res.json({ message: "Project mis à jour", project }); // nraj3 update
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Project (manager only)
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) 
            return res.status(404).json({ message: "Project introuvable" });

        // ken user e3mel hedhi, mamnou3
        if (req.user.role !== "manager") {
            return res.status(403).json({ message: "Accès interdit" });
        }

        await project.remove(); // nfas5ou
        res.json({ message: "Project supprimé" }); // n3mlou réponse
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
