const User = require("../models/User"); // nimporte modèle User

// Get all users → manager only
exports.getUsers = async (req, res) => {
    try {
        if (req.user.role !== "manager") { // ken l user moch manager
            return res.status(403).json({ message: "Accès interdit" }); // man3a
        }

        const users = await User.find().select("-password"); // njiwibou barcha users, sans password
        res.json(users); // nb3thou liste
    } catch (error) {
        res.status(500).json({ message: error.message }); // erreur serveur
    }
};

// Get single user → manager sees all, user sees self
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // njiwib user selon id
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" }); // ken mch mawjouud

        // Access control
        if (req.user.role !== "manager" && user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès interdit" }); // moch manager w heka moch houwa → man3a
        }

        res.json(user); // na3tih l user li talbo
    } catch (error) {
        res.status(500).json({ message: error.message }); // erreur serveur
    }
};

// Update user → only manager or self
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // njiwib user li bch nbadlouh
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        // Access control
        if (req.user.role !== "manager" && user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès interdit" }); // kima fou9, manager wela nafssou
        }

        const { nom, login, role } = req.body; // les données eli yheb ybadl
        user.nom = nom || user.nom; // ken b3ath nom jdiiid
        user.login = login || user.login; // ken b3ath login jdid
        if (req.user.role === "manager") user.role = role || user.role; // role ybadlouh ghir manager

        await user.save(); // nsajlou tbadil
        res.json({ message: "Utilisateur mis à jour", user }); // réponse
    } catch (error) {
        res.status(500).json({ message: error.message }); // erreur
    }
};

// Delete user → manager only
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== "manager") { // ken moch manager
            return res.status(403).json({ message: "Accès interdit" }); // man3a
        }

        const user = await User.findById(req.params.id); // njiwib user eli bch nfas5ouh
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        await user.remove(); // nfaskhou mel base
        res.json({ message: "Utilisateur supprimé" }); // réponse
    } catch (error) {
        res.status(500).json({ message: error.message }); // erreur serveur
    }
};
