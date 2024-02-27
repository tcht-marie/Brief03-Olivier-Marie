window.addEventListener("load", () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViOWQ4NTQzODM2OGYxMzg2OTc3MzlkMDY3NmU5MCIsInN1YiI6IjY1ZGI2NDU5ODI2MWVlMDE4NWMyZmE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqaglO-GjtRSZOQomGgTqN6cuNF7LE1oecefis70Kds'
        }
    };


    //fonction qui transforme la date en YYYY-MM-DD
    function formatDate(date = new Date()) {
        const year = date.toLocaleString('default', { year: 'numeric' });
        const month = date.toLocaleString('default', {
            month: '2-digit',
        });
        const day = date.toLocaleString('default', { day: '2-digit' });
        return [year, month, day].join('-');
    }
    /////////////////////////////////////

    // transformation de la date du jour dans le bon format
    let dateJ;
    dateJ = formatDate(new Date())
    let generalParams = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-fr&page=1&primary_release_date.gte=" + dateJ + "&sort_by=primary_release_date.asc";



    fetch(generalParams, options)
        .then(response => response.json())
        .then((data) => {
            let listeFilm = data.results;



            let mainList = document.querySelector("main");


            listeFilm.forEach(element => {
                //  le titre du film, l'affiche, la date de sortie, la durée et le genre.
                let titre = element.original_title;
                let affiche = "https://image.tmdb.org/t/p/w500" + element.poster_path;
                let dateSortie = element.release_date;
                let duree = " ATTENTION ";
                // let genre = element.genre_ids[0];
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
                p1.innerHTML = dateSortie;

                let p2 = document.createElement("p");
                cardFilm.appendChild(p2);
                p2.classList.add("movieLength");
                p2.innerHTML = duree;

                let p3 = document.createElement("p");
                cardFilm.appendChild(p3);
                p3.classList.add("movieGenre");
                p3.innerHTML = genre;

                let lien = document.createElement("a");
                cardFilm.appendChild(lien);
                lien.classList.add("lienDetails");
                lien.innerHTML = "Plus de détails";
                lien.href = "details.html?" + id;

                // console.log(" NOUVEAU FILM ");
                // console.log(titre);
                // console.log(affiche);
                // console.log(dateSortie);
                // console.log(duree);
                // console.log(genre);
                // console.log(" ----------------- ");



            });

        })


        .catch(err => console.error(err));
})
