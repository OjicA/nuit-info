document.addEventListener("DOMContentLoaded", function() {
    // S'assure que le contenu hors des limites du viewport n'est pas visible
    document.body.style.overflow = 'hidden';

    // Créez un élément img
    const logo = document.createElement('img');
    logo.src = '/logo.png'; // Remplacez par le chemin correct vers votre image
    logo.alt = 'Logo';
    logo.id = 'logo'; // Donnez un ID si nécessaire pour le style
    logo.style.position = 'absolute'; // Position absolute pour un placement flexible
    logo.style.transform = 'rotateY(180deg)';

    // Ajoutez le logo au body
    document.body.appendChild(logo);

    // Définissez les dimensions de la fenêtre
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    logo.onload = function() {
        // Taille de l'image logo
        const logoWidth = logo.offsetWidth;
        const logoHeight = logo.offsetHeight;

        // Choisir aléatoirement un bord : 
        // 0 pour haut, 1 pour droite, 2 pour bas, 3 pour gauche
        const borderSide = Math.floor(Math.random() * 4);

        // Variables pour les positions
        let randomX, randomY;

        switch (borderSide) {
            case 0: // Haut
                randomX = Math.random() * (windowWidth - logoWidth);
                randomY = -logoHeight / 2;
                break;
            case 1: // Droite
                randomX = windowWidth - logoWidth / 2;
                randomY = Math.random() * (windowHeight - logoHeight);
                break;
            case 2: // Bas
                randomX = Math.random() * (windowWidth - logoWidth);
                randomY = windowHeight - logoHeight / 2;
                break;
            case 3: // Gauche
                randomX = -logoWidth / 2;
                randomY = Math.random() * (windowHeight - logoHeight);
                break;
        }

        // Appliquer les positions calculées
        logo.style.left = `${randomX}px`;
        logo.style.top = `${randomY}px`;
    };

    logo.addEventListener('click', function() {
        // Vérifier la transformation actuelle et l'ajuster en conséquence
        if (logo.style.transform === 'rotateY(180deg)') {
            logo.style.transform = 'rotateY(0deg)'; // Remet l'image à la position normale
        } else {
            logo.style.transform = 'rotateY(180deg)'; // Retourne à nouveau si besoin
        }
    });
});
