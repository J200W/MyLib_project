<?php

session_start();
$_SESSION['authBDD'] = false;
header('Location: view/Home.php');

?>
