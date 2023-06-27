// const mysql = require('mysql2/promise');

async function list_books() {
  try {
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7624887',
        password: '5YcetTXFDf',
        database: 'sql7624887',
    });

    const query = 'SELECT * FROM ebook';
    const [rows] = await connection.query(query);

    // Perform additional operations on the retrieved rows as needed

    connection.end();
    return rows;
  } catch (error) {
    console.error('Error listing books:', error);
    throw error;
  }
}

module.exports = { list_books };
/*
// Usage example:
listBooks()
  .then((books) => {
    console.log('Books:', books);
    // Handle the retrieved books data
  })
  .catch((error) => {
    console.error('Error:', error);
  });*/