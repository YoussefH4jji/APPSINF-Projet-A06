const express = require('express'); 
const path = require('path');
const app = express();
const PORT = 8080; // c'est le port sur lequel on va voir notre site

 // on dit ) express qu'on va utiliser ejs  et qu'ils sont dans le dossier views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// on dit a express ou sont les fichiers statiques (css, img, js) 
// du coup /styles/style.css par exemple ou /images/logo.png
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true })); // pour récup les données des formulaires (tout les données sont env via POST)

// page d'acc 
app.get("/", (req, res) => {
    const date = new Date();
    res.render("index", { date: date.toLocaleDateString("fr-FR") }); 
})

// page pour créer un compte
app.get("/create_account", (req, res) => {
    res.render("create_account");
});

// page pour signaler un incident
app.get("/incident", (req, res) => {
    res.render("crea_inc");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});