const mysql = require('mysql2/promise');

async function my_books(id_client) {
  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'SELECT * FROM emprunter WHERE Id_Client=?';
    const [rows] = await connection.query(query, [id_client]);

    // Perform additional operations on the retrieved rows as needed

    connection.end();
    return rows;
  } catch (error) {
    console.error('Error listing books:', error);
    throw error;
  }
}

module.exports = { my_books };