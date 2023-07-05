# MyLib

MyLib est un site web permettant aux utilisateurs d'emprunter des e-books gratuitement pour une durée limitée. Le site offre une plateforme conviviale et intuitive pour découvrir, rechercher et emprunter une vaste collection d'e-books dans différents genres et catégories.  

  

## Fonctionnalités :

**Inscription et authentification :** Les utilisateurs peuvent créer un compte sur MyLib en fournissant leurs informations de base. Une fois inscrits, ils peuvent se connecter à leur compte pour accéder aux fonctionnalités complètes du site.  

**Modifier informations :** Les utilisateurs ont la possibilité de modifier les informations de leurs compte lorsqu’ils le désirent.

**Catalogue d'e-books :** MyLib propose un catalogue d'e-books organisé par thèmes et catégories. Les utilisateurs peuvent parcourir les différentes sections, afficher les détails des livres et lire des descriptions pour découvrir les e-books disponibles.  

**Recherche avancée :** Le site propose une fonction de recherche avancée permettant aux utilisateurs de trouver rapidement des e-books spécifiques en utilisant des mots-clés, des auteurs ou des titres.  

**Emprunt d'e-books :** Les utilisateurs peuvent emprunter des e-books en fonction de leur disponibilité. Chaque e-book a une durée d'emprunt limitée, après quoi il sera automatiquement rendu. Les utilisateurs peuvent consulter leur liste d'e-books empruntés et gérer leur retour.  

**Partage d'e-books :** Les utilisateurs peuvent partager des e-books qu’ils ont emprunté à d’autres utilisateurs. Une fois partagé, ils n’auront plus accès à l’e-book mais pourront l’emprunter à nouveau s’ils le désirent.

**Historique des emprunts :** MyLib maintient un historique des emprunts passés des utilisateurs, ce qui leur permet de consulter les e-books qu'ils ont empruntés précédemment et de les relire s'ils sont disponibles.  

**Favoris :** Les utilisateurs peuvent marquer des e-books comme favoris pour les retrouver facilement plus tard et être informés des nouvelles sorties ou des mises à jour concernant ces livres.  

**Commentaires et notes :** Les utilisateurs ont la possibilité de noter et de commenter un e-book à condition qu’ils l’aient emprunté.


## Guide technique pour l’exécution

La solution n’étant pour le moment pas déployée, voici les instructions pour l’exécuter dans un environnement de développement (EDI).

**NB** : une commande sera notée sous cette forme : £ <commande> £/ pour éviter les ambiguïté des points ou guillemets.

### Guide d’installation

Voici les étapes nécessaires pour l’installation :

- Cloner le dépôt Git dans le dossier voulu, commande :  £ git clone <URL_du_dépôt> <chemin_de_destination> £/. On prend l’exemple ici du dossier C:/Users/Moi/MyLib_project. URL : https://github.com/J200W/MyLib_project/tree/New-James-AND-ONLY-James

- Aller dans le dossier « frontend » (Fro) du projet : £ cd C:/Users/Moi/MyLib_project/frontend £/

- Installer les dépendances : £ npm install £

- Exécuter les étapes 2 et 3 pour le dossier « backend » (Ba) : exécuter £ cd ../backend £/ si on est dans Fro.

### Pour le lancement :

- Dans le dossier Fro, lancer la commande : £ npm run serve £/

- Dans le dossier Ba, lancer : £ nodeJs main_serveur.js £/ 