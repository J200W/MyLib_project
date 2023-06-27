// const mysql = require('mysql2/promise');




async function research(title){
  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = "SELECT * FROM ebook WHERE titre LIKE \'%'+title+'%\'";
    const [result] = await connection.query(query);

    return rows; /*{
      // Registration successful
      // Perform any necessary actions
      // Redirect or send a response indicating success

      res.send('Registration successful');
    } else {
      // Registration failed
      // Redirect or send a response indicating failure

      res.send('Registration failed');
    }*/

    connection.end();
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
};

module.exports = { research };