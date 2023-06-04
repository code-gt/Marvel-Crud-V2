# Projet CRUD Marvel V2

🚀 Salut à tous les super-héros du code ! 🚀

Bienvenue dans le projet Marvel CRUD Version 2 ! 🌟 L'objectif de ce projet est d'améliorer la création de nouveaux personnages en utilisant une API. 💪

Dans cette nouvelle version du TP Marvel CRUD, nous allons améliorer notre application en ajoutant un champ "background" pour chaque personnage et en utilisant l'API Fetch pour récupérer ces informations à partir du nom et de la description du personnage.


Bonne chance et amusez-vous bien ! 😄🎉 
## Objectifs :

- Ajouter un champ "background" dans la table "personnages" de la base de données.
- Utiliser ```fetch()``` pour créer un appel api et récupérer le background du personnage à partir de son nom et de sa description avant de l'enregistrer en base de données.
- Mettre à jour l'affichage de la liste des personnage en ajoutant le background du personnage.

## Avant de démarrer

[Présentation Google Slides](https://docs.google.com/presentation/d/1Oy0s2lG9BEEdyan9QHYXwLwU2WLFu2HhPSxSfvC7daY/edit?usp=sharing)

## Etape 0 : L'api Super Hero GPT  

 - Durant cette exercice vous allez être ammené à utiliser une API qui génére l'histoire d'un personnage à partir de son nom et de sa description
 - [Api Super Hero GPT](https://super-hero-gpt.kaffein.tech)

 Cette histoire est généré grâce à l'Intelligence Artificielle d'OpenAI
 
 - Créer un compte sur cette api en haut à droite vous trouveres le bouton "Register" 
 - Saisissez votre Nom Email et Mot de passe pour vous créer un compte 

 - Une fois votre compte créé, rendez vous dans "Dashboard" puis cliquez sur votre nom toujours en haut à droite enfi rendez vous sur API tokens.

 - Vous allez maintenant créer un token afin de pouvoir vous connectez à partir de l'application Marvel Crud 

## Étape 1 : Récupération du projet

Vous allez pouvoir récuperer votre projet Marvel crud qui sera notre base de travail pour la suite

## Étape 2 : Modification de la base de données
1. Rendez-vous sur votre phpmyadmin vous y retrouverez ainsi la base de donnée créé lors de la première partie du TP
   - Sélectionnez la base de données "marvel" dans l'arborescence de gauche.

2. Modifier la table "personnages"
   - Sélectionnez la table "personnages" puis rendez vous dans l'onglet "Structure".
   - Vous allez pouvoir créer une nouvelle colonne à votre table a l'aide du petit formulaire. 
   - "Ajouter 1 colonne après equipe_id" puis Cliquer sur "Excécuter"
   - Ajoutez la colonne nommée "background" :
     - background : LONGTEXT, valeur par default: null, nullable
   - Cliquez sur "Enregistrer" pour créer la nouvelle colonne.

## Étape 3 : Modification de la création du personnage
- Voici le code actuel que vous devez avoir : 
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
- Modifions ce code afin d'effectuer un appel api afin de récupérer le background avant d'enregistrer le personnage
```javascript
 /**
   * Route pour traiter le formulaire de création
   */
  app.post("/create", (req, res) => {
    const { nom, photo, description, equipe_id } = req.body;

    //Appel api
    fetch('https://super-hero-gpt.kaffein.tech/api/hero-background',{
      'method': 'post',
      'headers': {
        'Authorization' : 'Bearer <Ajouter le token>',
        'Content-Type' : 'application/json',
        'accept' : 'application/json',
      },
      'body' : JSON.stringify({name: nom, description: description})
    }).then((response)=>{
      return response.json();
    }).then((data)=>{ 
      console.log(data)
      const query = /*sql*/ `
            INSERT INTO personnages (nom, photo, description, background, equipe_id) 
            VALUES (?, ?, ?, ?, ?)
        `;
    
      db.query(query, [data.data.name, photo, data.data.description, data.data.background, equipe_id], (err, result) => {
        if (err) throw err;
        res.redirect("/");
      });
    })
  });
```

## Étape 4 : Mise à jour de l'affichage pour ajouter le background du personnage
- La route index récupère les personnages en base de données avant des les afficher dans la vue index.mustache
- analyson la request sql créer ici : 
```javascript
  /**
   * Route pour afficher la liste des personnages
   */
  app.get("/", (req, res) => {

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

- Cette requete sql récupère toute les données de la table personnage (p.*). La nouvelle colonne que nous avons ajouté precédement sera donc aussi récupéré. Tous va bien à ce niveau la du code nous n'avons rien à changer les données de la table personnage sont bien envoyer à la page index.mustache.
- Ajouter le code nessecaire pour afficher le background du personnage.

