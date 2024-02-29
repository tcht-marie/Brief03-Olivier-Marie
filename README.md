# Brief 3 - Création d'une page web dynamique pour GCR Cinéma - Marie / Olivier

## Besoin

GCR Cinéma a besoin d'une nouvelle page web pour afficher les films à l'affiche de manière plus dynamique et interactive. Cette page web sera utilisée par les clients pour découvrir les films, lire les descriptions et choisir les films qu'ils souhaitent voir.

## Spécifications de la page web

- La page web doit afficher les films à l'affiche sous forme de cartes interactives et triés de la date de sortie du plus proche a la plus élognée.
- Chaque carte doit afficher le titre du film, l'affiche, la date de sortie, la durée et le genre.
- Au clic sur une carte, une nouvelle page doit s'ouvrir avec la description détaillée du film.
- La page web doit utiliser l'API TheMovieDB pour récupérer les informations des films.
- La page web doit être responsive et accessible sur tous les appareils.

## Fonctionnalités

- Visualiser les prochaines sorties avec une carte contenant un visuel de celui-ci.
  ![exemple de carte de film](./img/exemple_carte_film.PNG)
- Possibilité de filtrer les films.
  ![exemple filtre film](./img/exemple_filtre_film.PNG)
- Lire le descriptif d'un film.
  ![exemple details film](./img/exemple_details_film.PNG)
- Voir les films associés sur la page d'un descriptif de film.
  ![exemple recommandation film](./img/exemple_recommandation_film.PNG)

## Critères de performance

- La page web doit être fluide et réactive sur tous les appareils.
- Le code doit être propre, bien commenté et documenté.
- L'utilisation de l'API CGR Cinéma doit être conforme à la documentation officielle.
- Utilisation de outils GitHub pour la gestion de vos tâches. Taches - Issues - Branche - Pull request

## Points techniques

### Page Liste des films

- Obtention et Affichage de la liste des films
  ![code liste film](./img/code_fetch_liste_film.png)

- Affichage d'une carte film

- Obtention et Affichage genre

- Filtre des films
  ![code filtre film](./img/code_fetch_filtre_genre_film.png)

### Page Détails d'un film

- Obtention et affichage details sur un film
  ![code filtre film](./img/code_fetch_recup_id_details_film.png)

- Obtention et affichage recommandation de film
  ![code filtre film](./img/code_fetch_reco_film.png)
