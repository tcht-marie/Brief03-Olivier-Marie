window.addEventListener("load", () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViOWQ4NTQzODM2OGYxMzg2OTc3MzlkMDY3NmU5MCIsInN1YiI6IjY1ZGI2NDU5ODI2MWVlMDE4NWMyZmE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqaglO-GjtRSZOQomGgTqN6cuNF7LE1oecefis70Kds'
        }
    };

    let url = window.location.href;
    console.log('fetch url : ', url);

    fetch('https://api.themoviedb.org/3/movie/969492?language=en-US', options)
        .then(response => response.json())
        .then((data) => {
            displayMovie(data);
        })
        .catch(err => console.error(err));
})


function displayMovie (data) {
    let idFilm = data;
    console.log('id film : ', idFilm);

    let mainDetails = document.querySelector('.movieDescription');

    let movieTitle = document.createElement('h2');
    movieTitle.innerHTML = idFilm.title;

    let detailsMovie = document.createElement('p');
    detailsMovie.innerHTML = idFilm.overview;

    let distribution = document.createElement('h3');
    distribution.textContent = 'Genre';

    mainDetails.append(movieTitle, detailsMovie, distribution);
    
    for (let index = 0; index < idFilm.genres.length; index++) {
        const element = idFilm.genres[index].name;
        let genre = document.createElement('p');
        genre.innerHTML = element;
        mainDetails.append(genre);
    }

    let releaseDate = document.createElement('p');
    releaseDate.innerHTML = "Date de sortie : " + data.release_date;
    
    let duration = document.createElement('p');
    duration.innerHTML = "Durée : " + data.runtime + "min";

    let budget = document.createElement('p');
    budget.innerHTML = "Budget du film : " + data.budget + " $";

    let homePage = document.createElement('a');
    homePage.href = data.homepage;
    homePage.innerHTML = homePage.href;

    mainDetails.append(releaseDate, duration, budget, homePage);
}