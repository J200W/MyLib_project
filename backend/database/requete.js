const mysql = require("mysql2/promise");

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freesqldatabase.com",
      user: "sql7624887",
      password: "5YcetTXFDf",
      database: "sql7624887",
    });
    console.log("Connected to the database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

async function sign_up(email, pseudo, password) {
  const connection = await mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7624887",
    password: "5YcetTXFDf",
    database: "sql7624887",
  });

  if (connection.state === "disconnected") {
    await connection.connect();
  }

  const query =
    "INSERT INTO Clients (mail_Clients, pseudo_Clients, mdp_Clients) VALUES (?, ?, ?)";

  try {
    const [result] = await connection.query(query, [email, pseudo, password]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error during registration:", error);
    const result = false;
    return result;
  }
}

async function verify_signIn(email, password) {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freesqldatabase.com",
      user: "sql7624887",
      password: "5YcetTXFDf",
      database: "sql7624887",
    });

    const query =
      "SELECT * FROM Clients WHERE mail_Clients = ? AND mdp_Clients = ?";
    const [rows] = await connection.query(query, [email, password]);
    return rows.length > 0;
  } catch (error) {
    console.error("Error during authentication:", error);
    //res.status(500).send('Internal server error');
    return false;
  }
} //); 

async function new_user(email, pseudo, password) {
  try { 
    const connection = await mysql.createConnection({
        host: "sql7.freesqldatabase.com",
        user: "sql7624887",
        password: "5YcetTXFDf",
        database: "sql7624887",
    });
    const query =
    "INSERT INTO Clients (mail_Clients, pseudo_Clients, mdp_Clients) VALUES (?, ?, ?)";
    const [result] = await connection.query(query, [email, pseudo, password]);

    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
        console.error("Error during registration:", error);
        return false;
  }
}

async function new_book(title, author, date, language, editor, page, category, theme, biblio, description, img) {
    console.log(title, author, date, language, editor, page, category, theme, biblio, description, img, pdf)
    try {
        const connection = await mysql.createConnection({
            host: "sql7.freesqldatabase.com",
            user: "sql7624887",
            password: "5YcetTXFDf",
            database: "sql7624887",
        });

        const id_biblio = await get_biblio_id(biblio);

        const query =
        "INSERT INTO ebook (titre, auteur, date_parution, langue, editeur, nb_pages, description, name_img, name_pdf, id_Biblio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [result] = await connection.query(query, [title, author, date, language, editor, page, description, img, pdf, id_biblio]);
  
        connection.end();
        return result.affectedRows > 0;
      }
    catch (error) {
        console.error("Error during registration:", error);
        return false;
    }
}

async function get_biblio_id(biblio) {
    try {
        const connection = await mysql.createConnection({
            host: "sql7.freesqldatabase.com",
            user: "sql7624887",
            password: "5YcetTXFDf",
            database: "sql7624887",
        });
        const query =
        "SELECT id_biblio FROM bibliotheque WHERE nom_biblio = ?";
        const [rows] = await connection.query(query, [biblio]);
        return rows[0].id_biblio;
    }
    catch (error) {
        console.error("Error during registration:", error);
        return false;
    }
}

async function research(title) {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freesqldatabase.com",
      user: "sql7624887",
      password: "5YcetTXFDf",
      database: "sql7624887",
    });

    const query = "SELECT * FROM ebook WHERE titre LIKE '%" + title + "%'";
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
    console.error("Error during registration:", error);
    return false;
  }
}

async function list_books() {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freesqldatabase.com",
      user: "sql7624887",
      password: "5YcetTXFDf",
      database: "sql7624887",
    });

    const query = "SELECT * FROM ebook";
    const [rows] = await connection.query(query);

    // Perform additional operations on the retrieved rows as needed

    connection.end();
    return rows;
  } catch (error) {
    console.error("Error listing books:", error);
    throw error;
  }
}

async function my_books(id_client) {
  try {
    const connection = await mysql.createConnection({
      host: "sql7.freesqldatabase.com",
      user: "sql7624887",
      password: "5YcetTXFDf",
      database: "sql7624887",
    });

    const query = "SELECT * FROM emprunter WHERE Id_Client=?";
    const [rows] = await connection.query(query, [id_client]);

    // Perform additional operations on the retrieved rows as needed

    connection.end();
    return rows;
  } catch (error) {
    console.error("Error listing books:", error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  verify_signIn,
  new_user,
  research,
  list_books,
  my_books,
  sign_up,
};
