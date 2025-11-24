const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

const PORT = 8080;
mongoose
  .connect('mongodb://127.0.0.1:27017/projetAPP')
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const incidentSchema = new mongoose.Schema({
  description: String,
  adresse: String,
  signale_par: String,
  date: { type: Date, default: Date.now },
});
const Incident = mongoose.model('Incident', incidentSchema);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "supersecretkey",
    saveUninitialized: false,
  })
);
app.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find(); //récupère les incidents depuis mongodb
    const date = new Date();
    const username = req.session.username || "Nom d'utilisateur";

    res.render("index", {
      date: date.toLocaleDateString("fr-FR"),
      username,
      incidents, 
    });
  } catch (error) {
    console.error("Erreur lors du chargement des incidents :", error);
    res.status(500).send("Erreur serveur");
  }
});

app.get("/login", (req, res) => {
  const message = req.query.message || null;
  res.render("login", { message });
});
app.get("/signup", (req, res) => {
  res.render("signup", { message: null });
});
app.post("/signup", async (req, res) => {
  console.log("Signup data :", req.body);
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { message: "Email déjà utilisé." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    document.cookie = "username=" + username + "password=" + password + "max-age=1300000" + "; path=/";

    res.redirect("/login?message= Compte créé avec succès ! Connectez-vous maintenant.");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Erreur interne du serveur");
  }
});
app.post("/login", async (req, res) => {
  console.log("login data :", req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const cookies = document.cookie.split(';');

    for(const c of cookies) {
      const [name,value] = cookie.split('=');
      if(name == username) {
        const username = value;
      }
      if(name == password) {
        const password = value;
      }
    }
    if (username && password) {
      document.cookie = "username=" + username + "password=" + password + "max-age=1300000" + "; path=/";
    }
  
    if (!user) {
      return res.render("login", { message: "Aucun compte trouvé avec cet email." });
    }

    if (user.password !== password) {
      return res.render("login", { message: "Mot de passe incorrect." });
    }
    req.session.username = user.username;
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", { message: "Échec de la connexion. Réessayez." });
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.get("/incident", (req, res) => {
  const username = req.session.username || "Utilisateur";
  res.render("crea_inc", { username });
});
app.post("/incident", async (req, res) => {
  try {
    const { description, adresse, signale_par, date } = req.body;

    const newIncident = new Incident({
      description,
      adresse,
      signale_par,
      date: date || Date.now(),
    });

    await newIncident.save();
    console.log("✅ Nouvel incident ajouté !");
    res.redirect("/"); //redirection vers la page index
  } catch (err) {
    console.error("Erreur lors de l’ajout :", err);
    res.status(500).send("Erreur lors de l’ajout de l’incident");
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})
