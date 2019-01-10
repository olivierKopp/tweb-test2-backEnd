# tweb-test2 Olivier Kopp

## Importation des films

![importDB](./importDB.png)

## Liste des films

La endpoint getMovies de graphql prend en paramètre un offset et retourne une page de 100 film en fonction de celui-ci.

## Authentification

J'ai décidé de créer un endpoint register sur graphql plutôt que de créer une route supplémentaire dans l'index.js. Cet endpoint retourne le user si il a pu être crée ou null sinon.

## WatchList

Les endpoints addInWatchList et removeFromWatchList permettent d'ajouter un tableau d'ID de film.
Le endPoint getWatchList retourne la liste des IDs des films dans la watchList d'un utilisateur.