<?php

session_start();
if (isset($_SESSION['authBDD'])) { //$_session is a superglobal which means it's available in all the scopes and allow us to check the same variable through all pages
    if ($_SESSION['authBDD'] == 'true') { //session of a registered user
        $auth = true;
    } else {
        $auth = false;
    }
} else {
    $_SESSION['authBDD'] = 'false'; // Not connected
    $auth = false;
}

include 'database/Connection.php';
include_once 'database/queries.php';

echo "<div class='header'>"; //header

// getting the current directory preceded by a forward “/” slash
$current_directory = rtrim(dirname($_SERVER['PHP_SELF']), '/');
$substring = "database";
$length = strlen($substring);
if (substr_compare($current_directory, $substring, -$length) === 0) {//test if we're in directory database
    $path_to_home = "../view/Home.php";
} else {
    $path_to_home = $current_directory . "/Home.php";
}

echo "<a href=$path_to_home class='logo'><img src='https://pics.freeicons.io/uploads/icons/png/17101267261557740324-512.png'></a>";
// echo "<div class='menu-btn'></div>";

echo "<div class='nav'>";
//echo "<div class='nav-pages'>";

$co = "\t";
$co .= '<div class="nav-pages authstatus ' . (($auth) ? 'connected' : 'disconnected') . '">' . "\n\t\t\t\t"; //creation of a div to put in it the new actions a connected user can do
$co .= '<div class="status">';
if ($auth) {
    //echo "id = " . $_SESSION['id'];
    echo "<div class='status'>";
    $co .= getUserById((int)$_SESSION['id']);

    //DEBUT SEARCH_BARRE
    echo "<form action=searchPage.php method=POST>";
    echo "<label for=titre>Nom :</label>";
    echo "<input type=submit value=Rechercher>";
    echo "</form>";
    //FIN SEARCH_BARRE

    echo "</br><a href=editProfile.php> Edit profile</a>";
    if ($_SESSION['admin'] == 1) {

        //echo "</br><a href=../view/Home.php>Back to home </a>";
        //echo "<a href=../view/deleteUser.php> Delete user </a>";
        //echo "<a href=view/Home.php> Delete recipe </a></br></br>";
    }
    echo "</br><a href=../disconnect.php>Disconnect </a></div>";
} else {
    $co .= '<p>Disconnected</p>'; // or the status disconnected if the user hasn't connected yet
    $co .= '<a href="creationUser.php">Sign up</a></br>';
    $co .= '<a href="authentification.php">Sign in to your account</a></br>' ;
}
$co .= '</span>' . "\n\t\t\t" . '</div></div>' . "\n\t\t</br>";
echo $co;

echo"</div>";

echo "</div>";

session_write_close();

function home()
{
    $current_directory = rtrim(dirname($_SERVER['PHP_SELF']), '/');

    $substring = "database";
    $length = strlen($substring);
    if (substr_compare($current_directory, $substring, -$length) === 0) {
        $path_to_home = "../view/Home.php";
    } else {
        $path_to_home = $current_directory . "/Home.php";
    }
    return header('Location:  ' . $path_to_home);
}

?>