<?php
require 'Connection.php';
echo "<form action=queries.php method=POST>";
echo  "<label for=title>Titre :</label>";
echo  "<input type=text id=title name=title><br>";

echo  "<label for=date_parution>Date de parution :</label>";
echo  "<input type=text id=date_parution name=date_parution><br>";

echo  "<label for=auteur>Auteur :</label>";
echo  "<input type=text id=auteur name=auteur><br>";

 echo "<label for=nb_chapitres>Nombre de chapitres :</label>";
 echo "<input type=text id=nb_chapitres name=nb_chapitres><br>";

echo  "<label for=nb_pages>Nombre de pages :</label>";
echo  "<input type=text id=nb_pages name=nb_pages><br>";

echo  "<label for=editeur>Éditeur :</label>";
echo  "<input type=text id=editeur name=editeur><br>";

echo  "<label for=category>Catégorie :</label>";
echo  "<input type=text id=category name=category><br>";

echo  "<label for=age_limite>Âge limite :</label>";
echo  "<input type=text id=age_limite name=age_limite><br>";

echo  "<label for=langue>Langue :</label>";
echo  "<input type=text id=langue name=langue><br>";

echo  "<label for=id_biblio>ID Bibliothèque :</label>";
echo  "<input type=text id=id_biblio name=id_biblio><br>";

echo  "<input type=submit value=Envoyer>";
echo"</form>";