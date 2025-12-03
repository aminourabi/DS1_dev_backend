// heni njib mongoose bach nconnecti m3a MongoDB
const mongoose = require("mongoose");

// heni na3mel schema l User bach n7added structure mta3 table (collection)
const userSchema = new mongoose.Schema({
    nom: { type: String, required: true }, // esm l user, obligatoire sinon erreur
    login: { type: String, required: true, unique: true }, // login lazim w ykon unique fil base
    password: { type: String, required: true }, // mot de passe crypté, obligatoire
    role: { 
        type: String, 
        enum: ["user", "manager"], // role ykoun soit user soit manager bark
        default: "user" // par défaut kol user jdiiid ykoun user
    },
    dateCreation: { type: Date, default: Date.now } // date automatique mta3 création
});

// nasaddri modèle User bach nesta3mlouh fi controllers w routes
module.exports = mongoose.model("User", userSchema);
