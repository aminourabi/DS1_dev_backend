const mongoose = require("mongoose"); 
// hni njib mongoose bach nista3mil schema mte3 MongoDB

const taskSchema = new mongoose.Schema({
    // titre mta3e  task  ili hewa obligatoir
    titre: { type: String, required: true },

    // description mta3e task  ama hiya optionelle
    description: { type: String },

    // statut mta3e task (todo / doing / done) 
    statut: { type: String, enum: ["todo", "doing", "done"], default: "todo" },

    // deadline mta3  task
    deadline: { type: Date },

    // projet li task mchri fih (référence Project)w ili hema obligatoir zada
    projet: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

    // user eli assigné  3la task ili reference mta3e il user
    utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // date de création, auto générée
    dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema); 
// hni nasn3ou model Task bach nista3mle  fi controllers w routes 
