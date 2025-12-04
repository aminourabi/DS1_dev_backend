const mongoose = require("mongoose"); 
// hni jibna mongoose bach ni5dme  b schema mte3 Mongo

const projectSchema = new mongoose.Schema({ 
    nom: { type: String, required: true }, 
    // hni esm projet obligatoire sinon ya3ti erreur

    description: { type: String }, 
    // petite description 3la projet (optionnel)

    proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    // id mte3 l user eli 3mal projet lazim ykoun mawjoud

    statut: { type: String, enum: ["en cours", "termine", "pause"], default: "en cours" }, 
    // statut mte3 projet (en cours / termine / pause)

    dateCreation: { type: Date, default: Date.now } 
    // date ken project tsna3 auto teta3melle
});

module.exports = mongoose.model("Project", projectSchema); 
// hni nasn3ou model Project bach najmou nist3mlouh fi routes
