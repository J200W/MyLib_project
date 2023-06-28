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
  const connection = await connectToDatabase();

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

async function verify_signIn(email, password, admin) {
    try {
        const connection = await connectToDatabase();
        var query;
        if (admin == false) {
            query = "SELECT * FROM Clients WHERE mail_Clients = ? AND mdp_Clients = ?";
            const [rows] = await connection.query(query, [email, password])
            return {
                status: rows.length > 0,
                pseudo: rows[0].pseudo_Clients,
            };
        } 
        else {
            query = "SELECT * FROM Admin_biblio WHERE mail_admin = ? AND mdp_admin = ?"; 
            const [rows] = await connection.query(query, [email, password])
            return {
                status: rows.length > 0,
                pseudo: rows[0].pseudo_admin,
            };
        }
    }
    catch (error) {
        console.error("Error during authentication:", error);
        //res.status(500).send('Internal server error');
        return {
            status: false,
            pseudo: "",
        };
    }
}

async function new_user(email, pseudo, password) {
  try {
    const connection = await connectToDatabase();
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

async function modify_myAccount(email, pseudo, admin) {
  try {
    const connection = await connectToDatabase();
    var query;
    if (admin == "false") {
        const query = "UPDATE Clients SET pseudo_Clients = ? WHERE mail_Clients = ?"; 
        const [result] = await connection.query(query, [pseudo, email]);
        connection.end();
        return result.affectedRows > 0;
    }
    else {
        const query = "UPDATE Admin_biblio SET pseudo_admin = ? WHERE mail_admin = ?"; 
        const [result] = await connection.query(query, [pseudo, email]);
        connection.end();
        return result.affectedRows > 0;
    }

  } catch (error) {
    console.error("Error during registration:", error);
    return false;
  }
}

async function new_book(title,author,date,language,editor,page,category,theme,biblio,description,img,pdf,admin) {
  try {
    const connection = await connectToDatabase();

    var query =
      "REPLACE INTO Ebook (titre, auteur, date_parution, langue, editeur, nb_pages, description, name_img, name_pdf, id_Biblio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [resultNewBook] = await connection.query(query, [
        title,
        author,
        date,
        language,
        editor,
        page,
        description,
        img,
        pdf,
        admin,
    ]);

    if (resultNewBook.affectedRows < 1) {
        return false;
    }
    
    query = "SELECT MAX(id_Ebook) FROM Ebook";
    var [resultIdBook] = await connection.query(query);

    if (resultIdBook.length < 1) {
        return false;
    }

    query = "REPLACE INTO est_un (id_ebook, name_category) VALUES (?, ?)";

    var final_result = true;

    for (var i = 0; i < category.length; i++) {
        if (category[i] != "None") {
            [result] = await connection.query(query, [
                resultIdBook[0]["MAX(id_Ebook)"],
                category[i],
            ])
            final_result = final_result && result.affectedRows > 0;
        }
    }

    query = "REPLACE INTO parle_de (id_ebook, name_theme) VALUES (?, ?)";

    for (var i = 0; i < theme.length; i++) {
        if (theme[i] != "None") {
            [result] = await connection.query(query, [
                resultIdBook[0]["MAX(id_Ebook)"],
                theme[i],
            ])
            final_result = final_result && result.affectedRows > 0;
        }
    }

    connection.end();
    return resultNewBook.affectedRows > 0 && final_result && resultIdBook.length > 0;
  } catch (error) {
    console.error("Error during registration:", error);
    return false;
  }
}

async function research(title) {
  try {
    const connection = await connectToDatabase();

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
    const connection = await connectToDatabase();

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
    const connection = await connectToDatabase();

    const query = "SELECT * FROM emprunter WHERE mail_Clients=?";
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
  modify_myAccount,
  new_book,
};
