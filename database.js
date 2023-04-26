const mysql = require('mysql');

/**
 * 1. Nous créons une variable connection qui contient les informations de connexion à MySQL
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marvel'
});

/**
 * 2. Nous nous connectons à la base de données
 * 3. Si il y a une erreur, nous déclenchons une erreur fatale
 * 4. Si tout s'est bien passé, nous affichons un message de succès
 */
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

/**
 * 5. Nous exportons la variable connection 
 * afin de pouvoir l'utiliser dans d'autres fichiers
 */
module.exports = connection;