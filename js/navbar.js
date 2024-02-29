window.addEventListener("load", () => {
  document.querySelector("header").innerHTML += `
        <nav>
            <a href="index.html">Accueil</a>
            <a href="">Recherche</a>
            <a href="">Films populaires</a>
            <a href="">Contact</a>
        </nav>

        <div id="burger-menu">
            <span></span>
        </div>
    
        <div id="menu">
            <ul>
              <li><a href="index.html">Accueil</a></li>
              <li><a href="">Recherche</a></li>
              <li><a href="">Films populaires</a></li>
              <li><a href="">Contact</a></li>
            </ul>
        </div>`;
});

setTimeout(() => {
  // récupère les éléments injectés du DOM
  let burgerMenu = document.getElementById("burger-menu");
  let overlay = document.getElementById("menu");

  // évènement sur le menu burger pour qu'au clic il ouvre la liste du menu (voir css media queries)
  burgerMenu.addEventListener("click", function () {
    // this = ma div burgermenu
    this.classList.toggle("close");
    overlay.classList.toggle("overlay");
  });
}, 1000);
