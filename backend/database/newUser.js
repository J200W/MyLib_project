const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { name, login, password, firstname } = req.body;

  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'INSERT INTO clients (mail_client, nom_client, prenom_client, mdp_client) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [login, name, firstname, password]);

    if (result.affectedRows > 0) {
      // Registration successful
      // Perform any necessary actions
      // Redirect or send a response indicating success

      res.send('Registration successful');
    } else {
      // Registration failed
      // Redirect or send a response indicating failure

      res.send('Registration failed');
    }

    connection.end();
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});