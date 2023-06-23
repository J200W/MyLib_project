<?php

require 'Connection.php';
include_once '../index.php';
$result = $db->prepare('select * from clients where mail_client = ? and mdp_client = ?');

session_start();
if (isset($_POST['login']) && isset($_POST['password'])) {
    if (isset($_SESSION['authBDD']) || $_SESSION['authBDD'] != 'true') { // isset determines if a variable is declared and is different than null.
        $result->execute(array($_POST['login'], $_POST['password']));
        $result = $result->fetch();
        if ($result != null) {
            $_SESSION['authBDD'] = 'true';
            $_SESSION['id'] = (int) $result[0];
            //$_SESSION['admin'] = (int) $result[4];

            home();
            die();
        }
    }
}

$_SESSION['authBDD'] = 'false';
echo "Mauvais identifiant ou mot de passe </br>";
