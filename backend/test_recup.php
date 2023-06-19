<?php

// Récupérer les données envoyées par le composant MyAccount.vue
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier si des données ont été envoyées
if (!empty($data)) {
    // Vous pouvez accéder aux données envoyées depuis le composant ici
    $pseudo = $data['pseudo'];
    $genre = $data['genre'];
    // ...

    // Faites quelque chose avec les données reçues, comme les enregistrer dans une base de données, les traiter, etc.

    // Exemple de réponse renvoyée au composant
    $response = array('status' => 'success', 'message' => 'Données reçues avec succès from test_recup.php :' . $pseudo .' ' . $genre);
    echo json_encode($response);
} else {
    // Aucune donnée n'a été envoyée
    $response = array('status' => 'error', 'message' => 'Aucune donnée reçue.');
    echo json_encode($response);
}
?>






