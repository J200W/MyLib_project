/*In this example, we use Express.js as the web framework to handle HTTP requests. 
When a POST request is made to the /login endpoint, the server-side code executes the database query 
to check the provided login and password against the clients table.*/

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'SELECT * FROM clients WHERE mail_client = ? AND mdp_client = ?';
    const [rows] = await connection.query(query, [login, password]);

    if (rows.length > 0) {
      // Authentication successful
      // Perform any necessary actions
      // Redirect or send a response indicating success

      res.send('Authentication successful');
    } else {
      // Authentication failed
      // Redirect or send a response indicating failure

      res.send('Invalid credentials');
    }

    connection.end();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});