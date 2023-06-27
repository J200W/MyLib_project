const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'sql7.freesqldatabase.com',
      user: 'sql7624887',
      password: '5YcetTXFDf',
      database: 'sql7624887',
    });
    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}