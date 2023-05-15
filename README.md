# PG219
Geocaching app

Asma Chebbi, Julie Messner, Maya Legris

Répartition du travail :

Asma : Map, Commentaires, Actions sur les balises.

Julie : Authentification, token.

Maya : Balises (Affichage, création), Paramètres, création database

Globalement, le travail était mélangé entre les membres. Bien que l'on puisse déceler des axes de travails différents, beaucoup de parties ont été mélangées et le travail a été mis en commun.


Pour lancer l'application :
  1) Git clone (du projet)
  2) Effectuer npm install dans le dossier client et le dossier server
  3) Modifier dans les fichiers du sous-dossier ./client/screens l'adresse IP de l'ordinateur et mettre celle de son PC (avec ipconfig).
  4) Effectuer la commande "mongod --dbpath ./mongodata" là où mongodb est installé
  5) Effectuer la commande "npm run server" depuis le dossier ./server (l'exécution sera avec nodemon voir fichier package.json).
  6) Effectuer la commande "npx expo start --tunnel" depuis le dossier ./client puis lancer sur téléphone ou sur un émulateur
