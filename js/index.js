const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViOWQ4NTQzODM2OGYxMzg2OTc3MzlkMDY3NmU5MCIsInN1YiI6IjY1ZGI2NDU5ODI2MWVlMDE4NWMyZmE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqaglO-GjtRSZOQomGgTqN6cuNF7LE1oecefis70Kds",
  },
};

// declaration de la fonction qui va rechercher une liste de film en fonction d'un parametre
function chargementFilm(params) {
  console.log(" --- CHARGEMENT FILMS ---");
  fetch(params, options)
    .then((response) => response.json())
    .then((data) => {
      let listeFilm = data.results;

      let mainList = document.querySelector("main");

      listeFilm.forEach((element) => {
        //  le titre du film, l'affiche, la date de sortie, la durée et le genre.
        let titre = element.original_title;
        let affiche = "https://image.tmdb.org/t/p/w500" + element.poster_path;
        let dateSortie = element.release_date;

        let genre = element.genre_ids;
        let id = element.id;

        //hydratation

        let cardFilm = document.createElement("div");
        mainList.appendChild(cardFilm);
        cardFilm.classList.add("movie");

        let titreFilm = document.createElement("h2");
        cardFilm.appendChild(titreFilm);
        titreFilm.classList.add("movieTitle");
        titreFilm.innerHTML = titre;

        let afficheFilm = document.createElement("img");
        cardFilm.appendChild(afficheFilm);
        afficheFilm.src = affiche;
        afficheFilm.classList.add("movieImg");

        let p1 = document.createElement("p");
        cardFilm.appendChild(p1);
        p1.classList.add("movieReleaseDate");
        p1.innerHTML = "Date de sortie : " + dateSortie;

        let lien = document.createElement("a");
        cardFilm.appendChild(lien);
        lien.classList.add("lienDetails");
        lien.innerHTML = "Plus de détails";
        lien.href = "details.html?" + id;
      });
    })
    .catch((err) => console.error(err));
}

window.addEventListener("load", () => {
  let filtres = document.querySelector(".legend");

  fetch("https://api.themoviedb.org/3/genre/movie/list?language=fr", options)
    .then((response) => response.json())
    .then((data) => {
      let listeFiltre = data.genres;

      listeFiltre.forEach((element) => {
        let filtre = document.createElement("div");
        filtres.appendChild(filtre);
        filtre.classList.add("filtre");

        let filtreInput = document.createElement("input");
        filtreInput.type = "checkbox";
        filtreInput.id = element.id;
        filtreInput.name = element.id;
        filtre.appendChild(filtreInput);

        let filtreLabel = document.createElement("label");
        filtreLabel.innerText = element.name;
        filtreLabel.htmlFor = element.id;
        filtre.appendChild(filtreLabel);
      });
    })
    .catch((err) => console.error(err));

  // gestion formulaire filtres
  let btn = document.querySelector("#validationFiltre");
  let genreChoisis = "";

  btn.addEventListener("click", (event) => {
    let checkboxes = document.querySelectorAll("input:checked");
    checkboxes.forEach((element) => {
      genreChoisis += element.id + ",";
    });

    // retirer le dernier caractère
    let genreChoisisFetch = genreChoisis.substr(0, genreChoisis.length - 1);

    let filtredParams =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-fr&page=1&primary_release_date.gte=" +
      dateJ +
      "&sort_by=primary_release_date.asc&with_genres=" +
      genreChoisisFetch;

    // suppression de l'affichage des films deja présents
    let childToRemove = document.querySelectorAll(".movie");
    childToRemove.forEach((element) => {
      element.remove();
    });

    // chargement des films avec le filtre par genre
    chargementFilm(filtredParams);

    // reinit la liste des genres selectionnés
    genreChoisis = "";
  });

  //fonction qui transforme la date en YYYY-MM-DD
  function formatDate(date = new Date()) {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", {
      month: "2-digit",
    });
    const day = date.toLocaleString("default", { day: "2-digit" });
    return [year, month, day].join("-");
  }
  /////////////////////////////////////

  // transformation de la date du jour dans le bon format
  let dateJ;
  dateJ = formatDate(new Date());

  let generalParams =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-fr&page=1&primary_release_date.gte=" +
    dateJ +
    "&sort_by=popularity";

  // appel de la fonction qui recherche et affiche les films
  chargementFilm(generalParams);
});
