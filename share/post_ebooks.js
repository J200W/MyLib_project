// FONCTION qui permet de partager un livre : recoit en paramètre le mail du client, l'objet book avec son id et le pseudo du receveur (trouver le mail du receveur avec une requête)
const {prepare_response} = require("../backend/controllers/Tools_controllers");

async function req_share_book(reqBody) {
    try {
        // Querie pour récupérer le mail du receveur avec son pseudo
        if (reqBody.stock <= 0) {
            return prepare_response(false, reqBody, undefined, "The book is not possessed for sharing")
        }
        const query_receveur = "SELECT mail_Clients FROM Clients WHERE pseudo_Clients=?";
        const [rows_receveur] = await execute_query(query_receveur, [reqBody.pseudo_destination], "select");
        if (!rows_receveur.length > 0) {
            return prepare_response(false, reqBody, undefined, 'Pseudo du receveur non trouvé')
        }
        var mail_receveur = rows_receveur[0].mail_Clients;

        const query_toShare = "INSERT INTO partager (mail_Clients, id_Ebook, mail_Clients_dest) VALUES (?, ?, ?)";
        const rows_toShare = await execute_query(query_toShare, [reqBody.email, reqBody.book_shared.id, mail_receveur], "insert");
        return prepare_response(rows_toShare, reqBody, 'Book shared', 'Book already shared');

        // MODIF DE STOCK A FAIRE en BDD


    }
    catch (error) {
        console.error("Error sharing book:", error);
        return prepare_response(false, reqBody, undefined, 'Error during sharing book');
    }
}



async function req_emprunt_dates(id_client, id_book){
    try {
        let res_emprunte_table = await req_read_book(id_client, id_book)
        if (res_emprunte_table.status === "success"){
            return prepare_response(true,
                {debut_emprunt: res_emprunte_table.donnees.debut_emprunt, fin_emprunt: res_emprunte_table.donnees.fin_emprunt}
                , 'Book borrowed, allowed to read', 'Not borrowed, unable to read');
        }
        return res_emprunte_table;
    } catch (error) {
        console.error("Error checking if book is readable:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}