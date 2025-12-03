// heni bach nithakem fi acces 7assib role
module.exports = function(roles = []) {
    // ken 7atit role wahda bark, nconvertih lil array
    if (typeof roles === "string") {
        roles = [roles];
    }

    return (req, res, next) => {
        // lazim yken req.user mawjoud ba3id authMiddleware
        if (!req.user) {
            return res.status(401).json({ message: "Accès refusé" }); // man3a accès
        }

        // nchef kan role mta3 el user mawjouda fil roles eli authorized
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès interdit: rôle non autorisé" }); // man3a role
        }

        // kol chay mrigle, n3ayet next middleware
        next();
    };
};
