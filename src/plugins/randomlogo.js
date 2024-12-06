const elements=[];
document.addEventListener("DOMContentLoaded", function() {
    // S'assure que le contenu hors des limites du viewport n'est pas visible
    document.body.style.overflow = 'hidden';

    // Créez un élément img
    const logo = document.createElement('img');
    logo.src = '/logo.png'; // Remplacez par le chemin correct vers votre image
    logo.alt = 'Logo';
    logo.id = 'logo'; // Donnez un ID si nécessaire pour le style
    logo.style.position = 'absolute'; // Position absolute pour un placement flexible
    //logo.style.transform = 'rotateY(180deg)';

    // Ajoutez le logo au body
    elements.push(logo);
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
        const logoRect = logo.getBoundingClientRect();
    
        // Coordonnées actuelles du logo
        let startX = logoRect.left;
        let startY = logoRect.top;
    
        // Coordonnées du centre de la fenêtre, ajustées vers le haut de 150 pixels
        const centerX = (window.innerWidth - logoRect.width) / 2;
        const centerY = (window.innerHeight - logoRect.height) / 2 - 150;
    
        const duration = 1000; // Durée de l'animation en ms
        const startTime = performance.now();
    
        // Créez un rectangle blanc avec des coins arrondis et un contour vert
        const whiteBackground = document.createElement('div');
        whiteBackground.style.position = 'absolute';
        whiteBackground.style.backgroundColor = 'white';
        whiteBackground.style.width = '600px';
        whiteBackground.style.height = '400px';
        whiteBackground.style.zIndex = '0';
        whiteBackground.style.left = `${(window.innerWidth - 600) / 2}px`;
        whiteBackground.style.top = `${(window.innerHeight - 400) / 2}px`;
        whiteBackground.style.borderRadius = '15px';
        whiteBackground.style.border = '2px solid #98C520';
        whiteBackground.style.opacity = '0';  // Initialement transparent
        whiteBackground.style.transition = 'opacity 1s'; // Transition de fondu
        
        elements.push(whiteBackground);
        document.body.appendChild(whiteBackground);

        const closeButton = document.createElement('div');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.color = '#2B2C88';
        closeButton.style.left = `${centerX + 360}px`;
        closeButton.style.top = `${centerY + 25}px`;
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function(){
            elements.forEach(el => el.remove());
        });

        elements.push(closeButton);
        setTimeout(() => {
            document.body.appendChild(closeButton);
        }, duration);
        
    
        // Créez une colonne de lettres
        const letters = document.createElement('div');
        letters.style.position = 'absolute';
        letters.style.color = '#2B2C88'; // Couleur bleue en hexadécimal
        letters.style.fontSize = '35px';
        letters.style.fontWeight = 'bold'; // Texte en gras pour les lettres principales
        letters.style.left = `${centerX - 175}px`;
        letters.style.top = `${centerY + 230}px`;
        letters.style.transform = 'translateY(-50%)';
    
        const words = ["yreco est une entreprise formidable, franchement bravo !", "aourt. enfaite là, j'avais plus d'idée, désolé...", "are sont les bonnes idées actuellement.", "st-ce que c'est bon pour vous ?", "alembour", "ui, il faut absolument qu'on gagne et vous le savez très bien !"];
    
        // Ajoutez chaque lettre et son texte associé
        const letterElements = ['L', 'y', 'r', 'e', 'c', 'o'].map(function(letter, index) {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
    
            const p = document.createElement('p');
            p.textContent = letter;
            p.style.margin = '0';
            p.style.opacity = '0'; // Initialement transparent
            p.style.transition = 'opacity 0.5s'; // Transition de fondu
    
            const textSpan = document.createElement('span');
            textSpan.style.marginTop = '12px';
            textSpan.style.opacity = '0';
            textSpan.style.transition = 'opacity 0.1s';
            textSpan.style.fontSize = '20px'; // Taille de la police plus petite
            textSpan.style.fontWeight = 'normal'; // Texte normal, pas gras
            
            elements.push(p,textSpan,wrapper);
            wrapper.appendChild(p);
            wrapper.appendChild(textSpan);
            letters.appendChild(wrapper);
    
            return { p, textSpan, word: words[index] };
        });
        elements.push(letters);
        document.body.appendChild(letters);
    
        // Assurez-vous que le logo est devant
        logo.style.position = 'absolute';
        logo.style.zIndex = '1';
    
        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
    
            // Interpoler la position entre le début et la destination ajustée
            const currentX = startX + (centerX - startX) * progress;
            const currentY = startY + (centerY - startY) * progress;
    
            logo.style.left = `${currentX}px`;
            logo.style.top = `${currentY}px`;
    
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Une fois l'animation terminée, faites apparaître le rectangle en fondu
                whiteBackground.style.opacity = '1';
    
                // Faites apparaître les lettres une par une en fondu
                letterElements.forEach(({ p, textSpan, word }, letterIndex) => {
                    setTimeout(() => {
                        p.style.opacity = '1';
    
                        // Afficher chaque lettre du mot devant progressivement
                        word.split('').forEach((char, charIndex) => {
                            setTimeout(() => {
                                textSpan.textContent += char;
                                textSpan.style.opacity = '1';
                            }, 150 * charIndex);
                        });
    
                    }, 50 * (letterIndex + 1)); // délai de 500ms entre chaque lettre
                });
            }
        }
    
        requestAnimationFrame(animate);
    });
    
    
    
    
    
    
    
    
    
    
});
