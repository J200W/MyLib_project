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
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/test_recup.php') {
    // Récupère les données envoyées dans le corps de la requête
    //$postData = file_get_contents('php://input');

    // Décode les données JSON reçues
    //$requestData = json_decode($postData, true);
    // Traitez les données comme souhaité
    // Par exemple, vous pouvez enregistrer les données dans une base de données ou effectuer d'autres opérations

    // Inclure le fichier test_recup.php
    include 'test_recup.php';
    // Retourne une réponse JSON
    //header('Content-Type: application/json');
    //echo json_encode(['message' => 'Données reçues avec succès from test_serveur.php !']);
    exit();
}

// Vérifie si la requête est une requête GET vers la route '/test_recup.php'
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/elements_to_send.php') {
    // Inclure le fichier contenant les éléments à renvoyer
    include 'elements_to_send.php';

    // Utilisez les éléments importés ici selon vos besoins

    // Renvoie les éléments en tant que réponse JSON
    header('Content-Type: application/json');
    echo json_encode($elements);
    exit();
}

// Si la route demandée n'est pas trouvée, renvoie une réponse JSON avec une erreur 404
header("HTTP/1.0 404 Not Found");
header('Content-Type: application/json');
echo json_encode(['error' => 'Page non trouvée']);
exit();

