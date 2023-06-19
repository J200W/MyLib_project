<?php

// Exemple de données à exporter
$elements =
    ['pseudo' => "Ethor",
    'genre' => "homme",
    'email' => "ethansuissa@efrei.net",
    'birthdate' => "2002-08-05",
    'books' => 1]
;

// Renvoie les éléments en tant que réponse JSON
header('Content-Type: application/json');
echo json_encode($elements);
exit();
