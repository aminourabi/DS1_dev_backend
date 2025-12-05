const Task = require("../models/Task"); 
// hni njib model Task bach nista3mleh fi CRUD

// Create Task 
exports.createTask = async (req, res) => {
    try {
        const { titre, description, statut, deadline, projet, utilisateurAssigne } = req.body; 
        // njib data mta3 task mel body

        const newTask = await Task.create({
            titre,                 // titre mta3 task
            description,           // description
            statut,                // statut (todo/doing/done)
            deadline,              // deadline
            projet,                // projet li task mchri
            utilisateurAssigne     // user eli assigné
        });

        res.status(201).json({ message: "Task créée", task: newTask }); 
        // nraj3ou task jdida w message
    } catch (error) {
        res.status(500).json({ message: error.message }); 
        // ken saret erreur
    }
};

// Get all tasks → manager sees all, user sees own
exports.getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "manager") {
            // manager ychouf barcha tasks
            tasks = await Task.find()
                .populate("projet", "nom")                   // njib nom projet
                .populate("utilisateurAssigne", "nom login"); // njib info utilisateur assigné
        } else {
            // user ychouf kan mta3ou
            tasks = await Task.find({ utilisateurAssigne: req.user.id })
                .populate("projet", "nom")
                .populate("utilisateurAssigne", "nom login");
        }

        res.json(tasks); // nraj3ou liste tasks
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ta3mel Get single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("projet", "nom")
            .populate("utilisateurAssigne", "nom login"); 
        // njib task wahed w info mte3 projet w user

        if (!task) return res.status(404).json({ message: "Task introuvable" });

        // access control: ken user ghair manager w task mte3ou bark
        if (req.user.role !== "manager" && task.utilisateurAssigne?._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        res.json(task); // nraj3ou task
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Task 
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task introuvable" });

        if (req.user.role !== "manager") {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const { titre, description, statut, deadline, utilisateurAssigne } = req.body;
        // njib data jdida mel body

        task.titre = titre || task.titre;                        // update titre
        task.description = description || task.description;      // update description
        task.statut = statut || task.statut;                     // update statut
        task.deadline = deadline || task.deadline;               // update deadline
        task.utilisateurAssigne = utilisateurAssigne || task.utilisateurAssigne; 
        // update user assigné

        await task.save(); 
        res.json({ message: "Task mise à jour", task }); // nraj3ou task mise à jour
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// bach tafsa5 task 
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task introuvable" });

        if (req.user.role !== "manager") {
            return res.status(403).json({ message: "Accès interdit" });
        }

        await task.remove(); 
        res.json({ message: "Task supprimée" }); // message de confirmation
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
