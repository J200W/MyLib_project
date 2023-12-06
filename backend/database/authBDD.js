/*In this example, we use Express.js as the web framework to handle HTTP requests. 
When a POST request is made to the /login endpoint, the server-side code executes the database query 
to check the provided login and password against the clients table.*/
// const mysql = require('mysql2/promise');
/*


const express = require('express');


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { login, password } = req.body; */
async function verify_signIn(email, password) {

  try {
    const connection = await mysql.createConnection({
      host: '78.192.134.140', //'192.168.0.35',
      user: 'efrei2023',
      password: 'EFREI.ethan2023',
      database: 'efreiS6_MyLib',
      port: 55306
    });

    const query = 'SELECT * FROM clients WHERE mail_client = ? AND mdp_client = ?';
    const [rows] = await connection.query(query, [email, password]);
    connection.end();

    return rows.length > 0;
    /*
    if (rows.length > 0) {
      // Authentication successful
      // Perform any necessary actions
      // Redirect or send a response indicating success
      res.send('Authentication successful');
    } else {
      // Authentication failed
      // Redirect or send a response indicating failure
      return false;
      res.send('Invalid credentials');
    }*/


  } catch (error) {
    console.error('Error during authentication:', error);
    //res.status(500).send('Internal server error');
    return false;
  }
}//);

/*
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); */

module.exports = { 
  verify_signIn 
};