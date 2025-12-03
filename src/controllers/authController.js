const User = require("../models/User"); // nimporte modèle User
const bcrypt = require("bcryptjs"); // nimporte bcrypt bch ncryptiw mdps
const jwt = require("jsonwebtoken"); // nimporte jwt bch ncréé tokens

// REGISTER
exports.register = async (req, res) => {
    try {
        const { nom, login, password, role } = req.body; // na5ou données mta3 l'inscription

        // Vérifier si login existe déjà
        const userExists = await User.findOne({ login }); // njiwib user bil login
        if (userExists) {
            return res.status(400).json({ message: "Login déjà utilisé" }); // ken mawjouud → erreur
        }

        // Crypter mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // ncrypti l mdps

        const newUser = await User.create({
            nom,
            login,
            password: hashedPassword, // mdps crypté
            role
        });

        res.status(201).json({ message: "Utilisateur créé", user: newUser }); // réponse ok

    } catch (error) {
        res.status(500).json({ message: error.message }); // erreur serveur
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { login, password } = req.body; // na5ou login w mdps

        const user = await User.findOne({ login }); // njiwib user li andou login hedha
        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable" }); // ken mech mawjouud
        }

        // Comparer mot de passe
        const isMatch = await bcrypt.compare(password, user.password); // nqaren mdps te3 user bel mdps crypté
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" }); // mdps ghalet
        }

        // Générer JWT
        const token = jwt.sign(
            { id: user._id, role: user.role }, // données fin token
            process.env.JWT_SECRET,            // clé secrète
            { expiresIn: "1d" }                // token yexpiry ba3ed nhar
        );

        res.json({
            message: "Connexion réussie", // login ok
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message }); // erreur serveur
    }
};
