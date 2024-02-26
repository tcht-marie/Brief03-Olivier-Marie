window.addEventListener("load", () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViOWQ4NTQzODM2OGYxMzg2OTc3MzlkMDY3NmU5MCIsInN1YiI6IjY1ZGI2NDU5ODI2MWVlMDE4NWMyZmE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqaglO-GjtRSZOQomGgTqN6cuNF7LE1oecefis70Kds'
        }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.asc', options)
        .then(response => response.json())
        .then((data) => {
            let listeFilm = data.results;



            listeFilm.forEach(element => {
                //  le titre du film, l'affiche, la date de sortie, la durée et le genre.
                let titre = element.original_title;
                let affiche = "https://image.tmdb.org/t/p/w500" + element.poster_path;
                let dateSortie = element.release_date;
                let duree = " ATTENTION ";
                let genre = element.genre_ids[0];

                console.log(" NOUVEAU FILM ");
                console.log(titre);
                console.log(affiche);
                console.log(dateSortie);
                console.log(duree);
                console.log(genre);
                console.log(" ----------------- ");



            });

        })


        .catch(err => console.error(err));
})
