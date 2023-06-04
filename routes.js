const db = require("./database");

const routes = (app) => {
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

  /**
   * Route pour traiter le formulaire de création
   */
  app.post("/create", (req, res) => {
    const { nom, photo, description, equipe_id } = req.body;

    //Appel api
    fetch('https://super-hero-gpt.kaffein.tech/api/hero-background',{
      'method': 'post',
      'headers': {
        'Authorization' : 'Bearer a2hHl9iDdqIvUp3lC0NG9eoSktYNPhuouRApicCc',
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

  /**
   * Route pour modifier un personnage
   */
  app.get("/edit/:id", (req, res) => {
    const id = req.params.id;

    const query = /*sql*/ `
        SELECT * FROM personnages WHERE id = ?
    `;
    db.query(query, [id], (err, personnages) => {
        if (err) throw err;

        const query = /*sql*/ `
            SELECT * FROM equipes
        `;

        db.query(query, (err, equipes) => {
            if (err) throw err;
            res.render("edit", { personnage: personnages[0], equipes });
        });
    });
  });

  /**
   * Route pour traiter le formulaire de modification de personnage
   */
  app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const { nom, photo, description, equipe_id } = req.body;

    const query = /*sql*/ `
        UPDATE personnages 
        SET nom = ?, photo = ?, description = ?, equipe_id = ? 
        WHERE id = ?
    `;
    db.query(query, [nom, photo, description, equipe_id, id], (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });

  /**
   * Route pour supprimer un personnage
   */
  app.get("/delete/:id", (req, res) => {
    const id = req.params.id;

    const query = /*sql*/ `
        DELETE FROM personnages WHERE id = ?
    `;

    db.query(query, [id], (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
};

module.exports = routes;
