require("dotenv").config(); // nchargee l variables d'environnement mel fichier .env
const express = require("express"); // nimporte express bch n7el serveur web
const connectDB = require("./src/config/db"); // nimporte fonction mta3 connexion MongoDB

const app = express(); // na3ml instance mta3 express

app.use(express.json()); // express yfait parse lel JSON eli yji fil requêtes


connectDB(); // n3ayyet lel fonction bch tconnecti m3a MongoDB


//les app.use
app.use("/api/auth", require("./src/routes/authRoutes")); // route mta3 authentification
app.use("/api/users", require("./src/routes/userRoutes")); // route mta3 utilisateurs

const PORT = process.env.PORT; // na5ou l port mel .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // n7el serveur w naffichi msg fil console
