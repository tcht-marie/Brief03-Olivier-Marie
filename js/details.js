// options pour fetch
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViOWQ4NTQzODM2OGYxMzg2OTc3MzlkMDY3NmU5MCIsInN1YiI6IjY1ZGI2NDU5ODI2MWVlMDE4NWMyZmE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqaglO-GjtRSZOQomGgTqN6cuNF7LE1oecefis70Kds",
  },
};

// recup de l'id du film choisi pour afficher les détails de ce film
window.addEventListener("load", () => {
  let url = window.location.href;
  let regexId = /\?(.*)/;
  let id = url.match(regexId);
  let idFilm = id[1];

  fetch(`https://api.themoviedb.org/3/movie/${idFilm}?language=fr-FR`, options)
    .then((response) => response.json())
    .then((data) => {
      displayMovie(data);
      displayReco(idFilm);
    })
    .catch((err) => console.error(err));
});

// fonction pour afficher les détails du film
function displayMovie(data) {
  // récupération des données du film fournit par l'API
  let idFilm = data;

  // hydratation
  let mainDetails = document.querySelector(".movieDescription");

  let movieTitle = document.createElement("h1");
  movieTitle.innerHTML = idFilm.title;

  mainDetails.appendChild(movieTitle);

  let movieDetails = document.createElement("div");

  movieDetails.classList.add("movieDetails");
  mainDetails.appendChild(movieDetails);

  let movieDescriptionContenu = document.createElement("div");
  movieDescriptionContenu.classList.add("movieDescriptionContenu");

  // condition pour afficher ou non le poster_path (car pas tous dispos dans l'API)
  if (idFilm.poster_path === null) {
    console.error("Aucuns posters dispos");
  } else {
    let movieImage = document.createElement("img");
    movieImage.src = "https://image.tmdb.org/t/p/w500" + idFilm.poster_path;
    movieDetails.appendChild(movieImage);
  }

  let detailsMovie = document.createElement("p");
  detailsMovie.innerHTML = idFilm.overview;

  movieDescriptionContenu.append(detailsMovie);

  movieDetails.appendChild(movieDescriptionContenu);

  // condition pour afficher ou non les genres (car pas tous dispos dans l'API)
  if (idFilm.genres.length === 0) {
    console.error("Aucuns genres trouvés");
  } else {
    let distribution = document.createElement("p");
    distribution.textContent = "Genre : ";
    distribution.classList.add("distribution");
    movieDescriptionContenu.appendChild(distribution);
    for (let index = 0; index < idFilm.genres.length; index++) {
      const element = idFilm.genres[index].name;
      let genre = document.createElement("p");
      genre.innerHTML = element;
      distribution.append(genre);
    }
  }

  let releaseDate = document.createElement("p");
  releaseDate.innerHTML = "Date de sortie : " + data.release_date;

  let duration = document.createElement("p");
  duration.innerHTML = "Durée : " + data.runtime + "min";

  let budget = document.createElement("p");
  budget.innerHTML = "Budget du film : " + data.budget + " $";

  movieDescriptionContenu.append(releaseDate, duration, budget);

  if (idFilm.homepage === "") {
    console.warn("aucun site lié à ce film");
  } else {
    let homePage = document.createElement("a");
    homePage.href = data.homepage;
    homePage.innerHTML = homePage.href;
    movieDescriptionContenu.appendChild(homePage);
  }
}

// fonction pour afficher les recommandations liées à l'id du film
function displayReco(idOrigin) {
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      idOrigin +
      "/recommendations?language=fr-FR&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let recommendations = data.results.slice(0, 5);

      let slider = document.querySelector(".slider");

      if (recommendations.length === 0) {
        const recoTitle = document.querySelector(".film-recommendations > h2");
        recoTitle.style.display = "none";
      }

      for (let index = 0; index < recommendations.length; index++) {
        const element = recommendations[index];

        let divReco = document.createElement("div");

        let titleReco = document.createElement("h4");
        titleReco.innerHTML = element.title;
        divReco.classList.add("recommendation-card");

        let imageReco = document.createElement("img");
        imageReco.src = "https://image.tmdb.org/t/p/w500" + element.poster_path;

        let lien = document.createElement("a");
        lien.classList.add("lienDetails");
        lien.innerHTML = "Plus de détails";
        lien.href = "details.html?" + element.id;

        divReco.append(titleReco, imageReco, lien);
        slider.appendChild(divReco);
      }
    })
    .catch((err) => console.error(err));
}
