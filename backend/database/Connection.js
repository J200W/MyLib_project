const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: '78.192.134.140', //'192.168.0.35',
      user: 'efrei2023',
      password: 'EFREI.ethan2023',
      database: 'efreiS6_MyLib',
      port: 55306
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
    console.log("result partiel ?", [])
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