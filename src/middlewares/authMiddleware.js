const jwt = require("jsonwebtoken"); // nimporte jwt bch nverifi token

module.exports = (req, res, next) => {
    const token = req.header("Authorization"); // njib token mel header Authorization

    if (!token) { // ken token mawjoudch
        return res.status(401).json({ message: "Accès refusé, token manquant" }); // man3a
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // nverifi token b JWT_SECRET
        req.user = decoded; // nhott données mel token (id + role) fil request
        next(); // n3ayet lel middleware ba3ed
    } catch (error) {
        res.status(400).json({ message: "Token invalide" }); // token ghalet
    }
};
