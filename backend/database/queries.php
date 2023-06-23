<?php

//Liste possible de futurs queries :


//DeleteBookByID
//DeleteUserByID

//ListUsers
//AddUser

//AddComment
//DeleteComment
ini_set('display_errors', 1);
function listBooks() //list all Recipes + bonus = click on the text leads to the Recipe
{
    require 'Connection.php';
    include_once 'Home.php';
    include_once '../index.php';
    include_once '../classes/ebook.php';

    //echo "in function";
    $arr = array();
    $result = $db->query('select * from ebook'); //all the infos in ebook
    while ($row = $result->fetch(PDO::FETCH_OBJ)) { //each result will be put in $row as an object with keys as their SQL names
        $arr[] = new Ebook($row->Id_ebook, $row->titre, $row->date_parution, $row->auteur, $row->nb_chapitres, $row->nb_pages, $row->editeur, $row->age_limite, $row->Id_Biblio); //create a new object Ebook
        // echo "<tr>";

        //add languages and categories
        $res = $db->prepare('select * from est_en join langues on langues.Id_Langue=est_en.Id_Langue where Id_ebook= ?');
        $res2 = $db->prepare('select * from est_un join categories on categories.Id_category=est_un.Id_category where Id_ebook= ?');
        foreach($arr as $ebook){

            $res->execute(array($ebook->getId()));
            while ($row = $res->fetch(PDO::FETCH_OBJ)) {
                $ebook->setLanguage($row->langue);
            }
            
           
            $res2->execute(array($ebook->getId()));
            while ($row2 = $res2->fetch(PDO::FETCH_OBJ)) {
                $ebook->setCategory($row2->category);
            }
        }
        
        
        /*
        echo '<form method ="get" action ="lectureRecipe.php" >';

        


        echo '<div class="recipe-name"><p><b>' . $row->name . '</b></p></div>';

        echo "<p class='creator'>From " . $row->uname . "</p>";

        echo '<input id="name" name="name" type="hidden" style="background-color : rgb(255, 255, 255); color : orange; font-family: verdana" placeholder="' . $row->name . '" value ="' . $row->name . '" readonly><input class="card-button" type="submit" value="See more"></form>';
        echo "</div>";
        // echo "</tr>";
        echo "</div>";*/
    }
    return $arr;
}

function dispABook(string $title)
{
    require 'Connection.php';
    include_once '../index.php';
    include_once '../classes/ebook.php';

    $arr = array();
    $result = $db->prepare('SELECT * FROM ebook WHERE ebook.titre=:titre');
    $result->bindParam(':titre', $title);
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        $arr[] = new Ebook($row->Id_ebook, $row->titre, $row->date_parution, $row->auteur, $row->nb_chapitres, $row->nb_pages, $row->editeur, $row->age_limite, $row->Id_Biblio); //create a new object Ebook
        // echo "<tr>";

        //add languages and categories
        $res = $db->prepare('select * from est_en join langues on langues.Id_Langue=est_en.Id_Langue where Id_ebook= ?');
        $res2 = $db->prepare('select * from est_un join categories on categories.Id_category=est_un.Id_category where Id_ebook= ?');
        foreach($arr as $ebook){

            $res->execute(array($ebook->getId()));
            while ($row = $res->fetch(PDO::FETCH_OBJ)) {
                $ebook->setLanguage($row->langue);
            }
            
           
            $res2->execute(array($ebook->getId()));
            while ($row2 = $res2->fetch(PDO::FETCH_OBJ)) {
                $ebook->setCategory($row2->category);
            }
        }
        

        /*
        if ($_SESSION['authBDD'] == 'true') { //session of a registered user
            $result = $db->prepare('SELECT Id_Recipe FROM Recipe WHERE name=:name');
            $result->bindParam(':name', $_GET['name']); //id comes from authBDD where the user was accessed with email and password and id was store in $_session[id]
            $result->execute();
            $row = $result->fetch(PDO::FETCH_OBJ);
            $idrecipe =  $row->Id_Recipe;
            echo '<form class="star" method ="get" action ="../database/changeFav.php" >';
            echo '<input type="hidden" name="recipe" value="' . $idrecipe . '">';
            if ($_GET['fav'] == 'no') {
                //echo "<img src=\"../view/star.png" class='button' style=\"width:50px;height:50px;\" onclick='fav()'/>";
                echo '<input type="hidden" id="fav" name="fav" value="no" >';
                echo '<input type="image" src="../img/star.png" width="50" height="50">';
            } else {
                //echo "<img src=\"../view/Star_orange.png" class='button' onclick='fav()' style='width:40px;height:40px;'/>";
                echo '<input type="hidden" id="fav" name="fav" value="yes" >';
                echo '<input type="image" id="fav" name="fav" src="../img/Star_orange3.png" value="yes" width="50" height="50">';
            }
        }*/

    }
    return $arr;
}

function getUserById(int $id)
{
    require 'Connection.php';
    include_once '../index.php';

    $result = $db->prepare('SELECT * FROM clients WHERE Id_Client=:id');
    $result->bindParam(':id', $id); //id comes from authBDD where the user was accessed with email and password and id was store in $_session[id]
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        if ($row == null) { //wrong id
            unset($objPdo);
            return null;
        } else {
            unset($objPdo);
            return '<p> connected as ' . $row->name . '<br /> with ' . $row->email . '</p>';
        }
    }
}

function addBook(String $title, String $date_parution, String $auteur, int $nb_chapitres, int $nb_pages, String $editeur, String $category, int $age_limite, String $langue, int $id_biblio){
    require 'Connection.php';
    include_once '../index.php';
    $result = $db->prepare('INSERT INTO ebook (title, date_parution, auteur, nb_chapitres, nb_pages, editeur, category, age_limite, langue, id_biblio) VALUES (titlev, date_parutionv, auteurv, nb_chapitresv, nb_pagesv, editeurv, categoryv, age_limitev, languev, id_bibliov);');

    $result->bindParam('titlev', $title);
    $result->bindParam('date_parutionv', $date_parution);
    $result->bindParam('auteurv', $auteur);
    $result->bindParam('nb_chapitresv', $nb_chapitres);
    $result->bindParam('nb_pagesv', $nb_pages);
    $result->bindParam('editeurv', $editeur);
    $result->bindParam('categoryv', $category);
    $result->bindParam('age_limitev', $age_limite);
    $result->bindParam('languev', $langue);
    $result->bindParam('id_bibliov', $id_biblio);

    $result->execute();
}

function ListBookByCategory(String $category){
    require 'Connection.php';
    include_once 'Home.php';
    include_once '../index.php';
    include_once '../classes/ebook.php';

    //echo "in function";
    $arr = array();
    $result = $db->query('select * from ebook where category = categoryv'); //all the infos in ebook
    $result->bindParam('categoryv', $category);
    while ($row = $result->fetch(PDO::FETCH_OBJ)) { //each result will be put in $row as an object with keys as their SQL names
        $arr[] = new Ebook($row->Id_ebook, $row->titre, $row->date_parution, $row->auteur, $row->nb_chapitres, $row->nb_pages, $row->editeur, $row->age_limite, $row->Id_Biblio); //create a new object Ebook
        // echo "<tr>";

        //add languages and categories
        $res = $db->prepare('select * from est_en join langues on langues.Id_Langue=est_en.Id_Langue where Id_ebook= ?');
        $res2 = $db->prepare('select * from est_un join categories on categories.Id_category=est_un.Id_category where Id_ebook= ?');
        foreach($arr as $ebook){

            $res->execute(array($ebook->getId()));
            while ($row = $res->fetch(PDO::FETCH_OBJ)) {
                $ebook->setLanguage($row->langue);
            }


            $res2->execute(array($ebook->getId()));
            while ($row2 = $res2->fetch(PDO::FETCH_OBJ)) {
                $ebook->setCategory($row2->category);
            }
        }


        /*
        echo '<form method ="get" action ="lectureRecipe.php" >';




        echo '<div class="recipe-name"><p><b>' . $row->name . '</b></p></div>';

        echo "<p class='creator'>From " . $row->uname . "</p>";

        echo '<input id="name" name="name" type="hidden" style="background-color : rgb(255, 255, 255); color : orange; font-family: verdana" placeholder="' . $row->name . '" value ="' . $row->name . '" readonly><input class="card-button" type="submit" value="See more"></form>';
        echo "</div>";
        // echo "</tr>";
        echo "</div>";*/
    }
    return $arr;
}

function ListBookByBiblio($id_biblio){
    require 'Connection.php';
    include_once 'Home.php';
    include_once '../index.php';
    include_once '../classes/ebook.php';

    //echo "in function";
    $arr = array();
    $result = $db->query('select * from ebook where id_biblio = biblio'); //all the infos in ebook
    $result->bindParam('biblio', $id_biblio);
    while ($row = $result->fetch(PDO::FETCH_OBJ)) { //each result will be put in $row as an object with keys as their SQL names
        $arr[] = new Ebook($row->Id_ebook, $row->titre, $row->date_parution, $row->auteur, $row->nb_chapitres, $row->nb_pages, $row->editeur, $row->age_limite, $row->Id_Biblio); //create a new object Ebook
        // echo "<tr>";

        //add languages and categories
        $res = $db->prepare('select * from est_en join langues on langues.Id_Langue=est_en.Id_Langue where Id_ebook= ?');
        $res2 = $db->prepare('select * from est_un join categories on categories.Id_category=est_un.Id_category where Id_ebook= ?');
        foreach($arr as $ebook){

            $res->execute(array($ebook->getId()));
            while ($row = $res->fetch(PDO::FETCH_OBJ)) {
                $ebook->setLanguage($row->langue);
            }


            $res2->execute(array($ebook->getId()));
            while ($row2 = $res2->fetch(PDO::FETCH_OBJ)) {
                $ebook->setCategory($row2->category);
            }
        }


        /*
        echo '<form method ="get" action ="lectureRecipe.php" >';




        echo '<div class="recipe-name"><p><b>' . $row->name . '</b></p></div>';

        echo "<p class='creator'>From " . $row->uname . "</p>";

        echo '<input id="name" name="name" type="hidden" style="background-color : rgb(255, 255, 255); color : orange; font-family: verdana" placeholder="' . $row->name . '" value ="' . $row->name . '" readonly><input class="card-button" type="submit" value="See more"></form>';
        echo "</div>";
        // echo "</tr>";
        echo "</div>";*/
    }
    return $arr;
}

function listUsers() //list all Recipes + bonus = click on the text leads to the Recipe
{
    require 'Connection.php';
    include_once 'Home.php';
    include_once '../index.php';

    //echo "in function";
    $arr = array();
    $result = $db->query('select * from users'); //all the infos in users
    $result->execute();
}


/*
function getUserNameById(int $id)
{
    require 'Connection.php';
    include_once '../index.php';

    $result = $db->prepare('SELECT name FROM Registered_User WHERE Id_User=:id');
    $result->bindParam(':id', $id); //id comes from authBDD where the user was accessed with email and password and id was store in $_session[id]
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        if ($row == null) { //wrong id
            unset($objPdo);
            return null;
        } else {
            unset($objPdo);
            return $row->name;
        }
    }
}

function getUserEmailById(int $id)
{
    require 'Connection.php';
    include_once '../index.php';

    $result = $db->prepare('SELECT email FROM Registered_User WHERE Id_User=:id');
    $result->bindParam(':id', $id); //id comes from authBDD where the user was accessed with email and password and id was store in $_session[id]
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        if ($row == null) { //wrong id
            unset($objPdo);
            return null;
        } else {
            unset($objPdo);
            return $row->email;
        }
    }
}

function getUserPasswordById(int $id)
{
    require 'Connection.php';
    include_once '../index.php';

    $result = $db->prepare('SELECT password FROM Registered_User WHERE Id_User=:id');
    $result->bindParam(':id', $id); //id comes from authBDD where the user was accessed with email and password and id was store in $_session[id]
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        if ($row == null) { //wrong id
            unset($objPdo);
            return null;
        } else {
            unset($objPdo);
            return $row->password;
        }
    }
}

function addFavorite(int $idU, int $idR)
{
    require 'Connection.php';
    $result = $db->prepare('INSERT INTO favorite (Id_User, Id_Recipe) VALUES (:idU, :idR)');
    $result->execute(['idU' => $idU, 'idR' => $idR]);
}

function removeFavorite(int $idU, int $idR)
{
    require 'Connection.php';
    $result = $db->prepare('DELETE FROM favorite WHERE Id_User=:idU AND Id_Recipe=:idR');
    $result->execute(['idU' => $idU, 'idR' => $idR]);
}

function dispFav(int $idU)
{
    require 'Connection.php';
    $result = $db->prepare('SELECT * FROM favorite join Recipe on Recipe.Id_Recipe = favorite.Id_Recipe WHERE favorite.Id_User=:id');
    $result->bindParam(':id', $idU);
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        echo '<li><a href = "../view/lectureRecipe.php?name=' . $row->name . '&fav=yes">' . $row->name . '</a></li>';
    }
}*/
