// const mysql = require('mysql2/promise');




async function new_user(email, name, password){
  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'INSERT INTO Clients (mail_client, nom_client, mdp_client) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, [email, name, password]);

    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
}

module.exports = { new_user };
