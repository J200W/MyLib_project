<?php

try {
    $db = new PDO('mysql:host=sql7.freesqldatabase.com;dbname=sql7624887;charset=utf8', 'sql7624887', '5YcetTXFDf');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
?>
