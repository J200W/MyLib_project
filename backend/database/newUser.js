const mysql = require('mysql2/promise');




async function new_user(email, pseudo, password){
  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'INSERT INTO Clients (mail_Client, pseudo_Clients, mdp_Client) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, [email, pseudo, password]);

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
