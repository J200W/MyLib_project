const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'sql7.freesqldatabase.com',
      user: 'sql7624887',
      password: '5YcetTXFDf',
      database: 'sql7624887',
    });
    if (connection.state === "disconnected") {
      await connection.connect();
    }
    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}


async function execute_query(query, params, mode) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(query, params);
    connection.end();
    if (mode === 'select') {
        return [rows];
    }
    else{
        return rows.affectedRows > 0;
    }
  } catch (error) {
    if (checkDuplicateEntryMessage(error.message)) {
        return false;
    }
    console.error('Error executing query:', error);
    throw error;
  }
}

function checkDuplicateEntryMessage(string) {
  const regex = /Duplicate entry '([^']+@[^']+)' for key 'PRIMARY'/;
  const match = string.match(regex);
  if (match) {
    const email = match[1];
    return email;
  }
  return null;
}

module.exports = { execute_query };