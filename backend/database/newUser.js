const mysql = require('mysql2/promise');




async function new_user(email, name, fname, password){
  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'INSERT INTO clients (mail_client, nom_client, prenom_client, mdp_client) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [email, name, fname, password]);

    connection.end();
    return result.affectedRows > 0; /*{
      // Registration successful
      // Perform any necessary actions
      // Redirect or send a response indicating success

      res.send('Registration successful');
    } else {
      // Registration failed
      // Redirect or send a response indicating failure

      res.send('Registration failed');
    }*/


  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
}

module.exports = { new_user };
