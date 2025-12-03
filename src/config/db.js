const mongoose = require('mongoose'); // nimporte mongoose pour connecter m3a MongoDB

const connectDB = async () => { // fonction asynchrone bch t7el connexion
  try { // njarreb l'execution houni
    await mongoose.connect(process.env.MONGO_URI); // connecti l base en utilisant l lien MONGO_URI
    console.log(" MongoDB connecté !"); // affiche elli l connexion mchya behi
  } catch (err) { // ken fama erreur tji houni
    console.error(" Erreur MongoDB :", err.message); // taffichi l erreur mta3 Mongo
    process.exit(1); // yebarreki l app 5atr connexion mafamhech
  }
};

module.exports = connectDB; // nasaddri l fonction bch nesta3mlha fi fichiers okhrin
