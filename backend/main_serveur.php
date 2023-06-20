<?php

// Permet de gérer les requêtes provenant de n'importe quel domaine
header("Access-Control-Allow-Origin: *");

// Si la requête est une requête OPTIONS, retourne les en-têtes nécessaires
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit();
}

// Vérifie si la requête est une requête POST vers la route '/test_recup.php'
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupère les données envoyées dans le corps de la requête
    //$postData = file_get_contents('php://input');
    // Décode les données JSON reçues
    //$requestData = json_decode($postData, true);
    $data = json_decode(file_get_contents('php://input'), true);

    // Traitez les données comme souhaité
    // Par exemple, vous pouvez enregistrer les données dans une base de données ou effectuer d'autres opérations
    switch($_SERVER['REQUEST_URI']){
        case '/test_recup.php':
            // Inclure le fichier test_recup.php
            include 'test_recup.php';
            // Retourne une réponse JSON
            //header('Content-Type: application/json');
            //echo json_encode(['message' => 'Données reçues avec succès from test_serveur.php !']);
            break;
        case '/send_login':
            // Retourne une réponse JSON
            header('Content-Type: application/json');
            echo json_encode([['message' => 'Données reçues avec succès from test_serveur.php !'], ['donnees' => $data]]);
            break;

        case '/send_research_fromNavBar':
            // Renvoie les éléments en tant que réponse JSON
            // Utilisez les éléments importés ici selon vos besoins
            header('Content-Type: application/json');
            echo json_encode($data);
            break;

        default:
            echo json_encode(['message' => "Erreur d'url pour methode POST"]);
            break;


    }
    exit();
}

// Vérifie si la requête est une requête GET vers la route '/test_recup.php'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    switch($_SERVER['REQUEST_URI']){
        case '/elements_to_send.php':
            // Inclure le fichier contenant les éléments à renvoyer
            include 'elements_to_send.php';
            // Renvoie les éléments en tant que réponse JSON
            // Utilisez les éléments importés ici selon vos besoins
            header('Content-Type: application/json');
            echo json_encode($elements);
            break;
        case '/send_research_fromNavBar':
            // Renvoie les éléments en tant que réponse JSON
            // Utilisez les éléments importés ici selon vos besoins
            header('Content-Type: application/json');
            echo json_encode($data);
            break;
        default:
            echo json_encode(['message' => "Erreur d'url pour methode POST"]);
            break;
    }

    exit();
}

// Si la route demandée n'est pas trouvée, renvoie une réponse JSON avec une erreur 404
header("HTTP/1.0 404 Not Found");
header('Content-Type: application/json');
echo json_encode(['error' => 'Page non trouvée']);
exit();

