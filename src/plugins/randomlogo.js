document.addEventListener("DOMContentLoaded", function() {
    // Créez un élément img
    const logo = document.createElement('img');
    logo.src = '/logotest.png'; // Remplacez par le chemin de votre logo
    logo.alt = 'Logo';
    logo.id = 'logo'; // Donnez un ID si nécessaire pour le style
    logo.style.position = 'absolute'; // Positionne absolument pour un placement aléatoire

    // Ajoutez le logo au body ou à tout autre élément parent
    document.body.appendChild(logo);

    // Définissez les dimensions de la fenêtre
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Attendez que l'image soit chargée pour être sûr de ses dimensions
    logo.onload = function() {
        // Taille de l'image logo
        const logoWidth = logo.offsetWidth;
        const logoHeight = logo.offsetHeight;

        // Calculer la position maximale possible tout en gardant le logo entièrement visible
        const maxX = windowWidth - logoWidth;
        const maxY = windowHeight - logoHeight;

        // Générer des positions aléatoires
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Appliquer les positions aléatoires
        logo.style.left = `${randomX}px`;
        logo.style.top = `${randomY}px`;
        logo.style.zIndex = -1
    };
});
