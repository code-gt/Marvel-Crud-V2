# Projet CRUD Marvel

🚀 Salut à tous les super-héros du code ! 🚀

Bienvenue dans le projet Marvel CRUD ! 🌟 L'objectif de ce projet est de vous apprendre à créer une application web pour gérer les personnages et les équipes de l'univers Marvel en utilisant NodeJS, Express, Mustache, MySQL, Nodemon et Pico.css. 💪

Au cours de ce projet, vous allez acquérir de nouvelles compétences et renforcer celles que vous avez déjà, notamment :

- Créer et gérer des bases de données MySQL 🗃️
- Utiliser phpMyAdmin pour explorer et manipuler les données 🕵️‍♀️
- Comprendre les principes relationnels et les clés étrangères 🔗
- Intégrer MySQL dans votre application NodeJS 🤖
- Créer un CRUD complet (Create, Read, Update, Delete) pour les personnages et les équipes de Marvel 📝

Alors, enfilez votre cape, préparez-vous à sauver le monde (ou du moins à gérer les personnages de Marvel) et plongez dans ce projet passionnant ! 🦸‍♀️🦸‍♂️

Bonne chance et amusez-vous bien ! 😄🎉 

## Avant de démarrer

[Présentation Google Slides](https://docs.google.com/presentation/d/1qqbm3Fes2CKzyuqVvXYBSmvclokaqZFtkYwtG2hzIhc/edit?usp=sharing)

## Etape 0 : Apprendre MySQL ! 

- https://colibri.unistra.fr/fr/course/list/notions-de-base-en-sql
- https://sql.sh/cours


## Étape 1 : Initialisation du projet

```bash
mkdir marvel-crud
cd marvel-crud
npm init -y
npm install express mustache mustache-express mysql
```

### En cas de problème avec nodemon

> ⚠️ Si vous avez des problèmes lors de ce projet lorsque vous lancez nodemon, avec l'erreur suivante : `Error: listen EADDRINUSE: address already in use :::3000` 
> 
> Alors tapez la commande suivante : `fuser -k 3000/tcp; nodemon`

### Installation de Xampp

Voici les instructions pour installer un serveur local MySQL (MariaDB) sur un poste Windows de manière simple et rapide en utilisant XAMPP :

1. Allez sur le site officiel de XAMPP : https://www.apachefriends.org/index.html
2. Cliquez sur le bouton "Download" pour télécharger la dernière version de XAMPP pour Windows.
3. Une fois le téléchargement terminé, lancez le fichier d'installation de XAMPP.
4. Suivez les instructions de l'assistant d'installation. Laissez les options par défaut cochées, y compris MySQL.
5. Cliquez sur "Next" jusqu'à ce que l'installation démarre. Une fois l'installation terminée, cliquez sur "Finish".
6. Lancez XAMPP Control Panel depuis le menu Démarrer ou le raccourci créé sur le bureau.
7. Dans le XAMPP Control Panel, cliquez sur le bouton "Start" à côté de "Apache" et "MySQL" pour démarrer les services.
8. Ouvrez votre navigateur et accédez à http://localhost/phpmyadmin pour accéder à l'interface de gestion de MySQL.
9. Vous pouvez maintenant créer des bases de données, des tables et gérer vos données à l'aide de phpMyAdmin.

## Étape 2 : Création de la base de données
1. Créer la base de données "marvel"
   - Cliquez sur l'onglet "Bases de données" en haut de la page.
   - Entrez "marvel" dans le champ "Nom de la base de données" et cliquez sur "Créer".

2. Créer la table "personnages"
   - Sélectionnez la base de données "marvel" dans l'arborescence de gauche.
   - Cliquez sur l'onglet "Structure", puis sur "Nouvelle table".
   - Nommez la table "personnages" et définissez le nombre de colonnes à 5, puis cliquez sur "Exécuter".
   - Ajoutez les colonnes suivantes :
     - id : INT, clé primaire, auto-incrément
     - nom : VARCHAR(255), non nul
     - description : TEXT, nullable
     - photo : VARCHAR(255), nullable
     - equipe_id : INT, nullable
   - Cliquez sur "Enregistrer" pour créer la table "personnages".

3. Créer la table "equipes"
   - Cliquez sur l'onglet "Structure", puis sur "Nouvelle table".
   - Nommez la table "equipes" et définissez le nombre de colonnes à 2, puis cliquez sur "Exécuter".
   - Ajoutez les colonnes suivantes :
     - id : INT, clé primaire, auto-incrément
     - nom : VARCHAR(255), non nul
   - Cliquez sur "Enregistrer" pour créer la table "equipes".

4. Définir la relation entre les tables "personnages" et "equipes"
   - Sélectionnez la table "personnages" dans l'arborescence de gauche.
   - Cliquez sur l'onglet "Relation" et sélectionnez "equipe_id" comme colonne source et "equipes.id" comme colonne cible.
   - Cliquez sur "Enregistrer" pour créer la relation entre les deux tables.

5. Insérer des données de test
   - Sélectionnez la table "equipes" et cliquez sur l'onglet "Insérer".
   - Entrez des données pour une ou

## Étape 3 : Connexion à la base de données
- Créez un fichier database.js dans le dossier du projet.
- Ajoutez le code suivant pour configurer et exporter la connexion à la base de données MySQL :
```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marvel'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});
module.exports = connection;
```

## Étape 4 : Configuration du serveur Express et du moteur de template Mustache
- Créez un fichier index.js dans le dossier du projet.
- Créez un dossier `views` qui contiendra les fichiers de template Mustache.
- Ajoutez le code suivant pour configurer le serveur Express et le moteur de template Mustache :

```javascript
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

/**
 * Configuration de mustache
 * comme moteur de template
 * pour l'extension .mustache
 */
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/**
 * Configuration de express
 * pour récupérer les données d'un formulaire
 * et pour servir les fichiers statiques
 * (css, js, images, etc.)
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes à ajouter ici

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Étape 5 : Affichage de la liste des personnages
- Dans le fichier index.js, ajoutez une route pour récupérer et afficher la liste des personnages avec leur équipe
```javascript
const db = require('./database');

/**
 * Route pour afficher la liste des personnages
 */
app.get("/", (req, res) => {
  // Requête SQL pour récupérer la liste des personnages
  const query = /*sql*/ `
      SELECT p.*, e.nom as nom_equipe 
      FROM personnages as p 
      JOIN equipes AS e 
      ON p.equipe_id = e.id
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.render("index", { personnages: result });
  });
});
```

- Créez un fichier index.mustache dans le dossier views et ajoutez le code HTML pour afficher la liste des personnages et des équipes.

## Étape 6 : Formulaire de création de personnages et d'équipes
- Ajoutez une route pour afficher le formulaire de création de personnages et d'équipes dans le fichier index.js :
```javascript
/**
 * Route pour afficher le formulaire de création
 */
app.get("/create", (req, res) => {
  const query = /*sql*/ `
      SELECT * FROM equipes
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.render("create", { equipes: result });
  });
});
```

- Créez un fichier create.mustache dans le dossier views et ajoutez le code HTML pour le formulaire de création de personnages et d'équipes.
- Ajoutez une route pour gérer la soumission du formulaire et insérer les données dans la base de données :
```javascript
/**
 * Route pour traiter le formulaire de création
 */
app.post("/create", (req, res) => {
  const { nom, photo, description, equipe_id } = req.body;

  const query = /*sql*/ `
      INSERT INTO personnages (nom, photo, description, equipe_id) 
      VALUES (?, ?, ?, ?)
  `;

  db.query(query, [nom, photo, description, equipe_id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});
```

## Étape 7 : Modification et suppression des personnages
- Ajoutez des routes pour afficher le formulaire de modification et gérer la soumission du formulaire.
- Ajoutez des routes pour gérer la suppression des personnages.

## Étape 8 : Finalisation
- Testez toutes les fonctionnalités du projet et assurez-vous qu'elles fonctionnent correctement.
- Ajoutez des commentaires dans votre code pour mieux se souvenir de ce qu'il fait

## Étape 9 : Aller plus loin
- Ajouter le code nécessaire pour créer une nouvelle équipe
- Ajouter un filtre pour afficher les personnages par équipe dans la vue index.mustache.
