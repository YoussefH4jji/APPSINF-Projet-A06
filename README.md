# APPSINF-Projet-A06
Application web de signalement d’incidents
## Membres du groupe:
* Fortuna Dos Santos Lucas
* Hajji Youssef
* von Lettow-Vorbeck Paul
* Allaoui Ali
## Dossier /html/
* index.html: page d'acceuil affichant les incidents signalés dans un tableau
* crea_acc.html: page de connexion / création de compte 
* crea_inc.html: formulaire de création d'un nouveau incident
## Dossier /css/
* style.css: feuille de style principale
* create_account.css: feuille de style des page connexion / création de compte et formulaire d'incident
## Instructions d'utilisation
1) Télécharger et extraire le fichier zip
2) Ouvrir index.html dans un navigateur
3) Naviguer via les liens
4) les fichiers .features sont des descriptions de besoins utilisateurs
## Description du projet
Le projet utilise :
1) Node.js pour le serveur
2) Express.js pour la gestion des routes
3) EJS pour les pages web dynamiques
4) MongoDB Atlas comme base de données partagée
5) Sessions pour la gestion de la connexion utilisateur
## Fonctionnalités principales
* Authentification
Création de compte
Connexion avec e-mail + mot de passe
Déconnexion
* Gestion des incidents
Formulaire de création d'incident
Stockage dans MongoDB
Affichage de tous les incidents sur la page d’accueil

* Interface utilisateur (EJS + CSS)
Pages dynamiques EJS
Tableau des incidents
Formulaire d’ajout
Formulaire de connexion / inscription

## Installation et lancement
▶️ 1. Installer les dépendances

Dans le dossier du projet :

npm install
npm install package.json
▶️ 2. Lancer le serveur
node server.js

▶️ 3. Accéder à l’application

Ouvre ton navigateur :

http://localhost:8080

## Base de données (MongoDB Atlas)

L’application utilise une base de données partagée :

Collection users

Collection incidents

Schéma utilisateur
{
  username: String,
  email: String,
  password: String
}

Schéma incident
{
  description: String,
  adresse: String,
  signale_par: String,
  date: Date
}
La connexion se fait via l’URL Atlas renseignée dans le server.js.
## Technologies utilisées
Node.js
Express.js
EJS
MongoDB Atlas
Mongoose
CSS