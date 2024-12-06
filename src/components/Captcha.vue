<template>
  <div class="captcha-container">
    <input type="checkbox" id="not-robot" v-model="isChecked" @change="openPuzzle" />
    <label for="not-robot">I'm not a robot</label>

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <button class="close-btn" @click="closePopup">X</button>
        <p>Select all squares with traffic lights</p>
        <div class="grid">
          <div
            v-for="(tile, index) in puzzleImages"
            :key="index"
            class="grid-item"
            :class="{ selected: tile.selected }"
            @click="selectTile(index)"
          >
            <img :src="tile.src" alt="puzzle tile" />
          </div>
        </div>
        <button @click="verifyPuzzle">Submit</button>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="showErrorMessage" class="error-message">
      <p>Looser t'as raté le captcha, aller ça dégage !</p>
    </div>

    <!-- Popup du jeu shooter -->
    <div
      v-if="showGamePopup"
      class="popup-overlay game-popup"
      @mousemove="handleMouseMove"
      @click="handleExplosion"
      @keydown.esc="closeGamePopup"
    >
      <div class="game-container">
        <div
          class="background-image"
          :style="`transform:translate(${-backgroundOffset.x}px, ${-backgroundOffset.y}px)`"
        >
          <!-- Minion ou Gru -->
          <div
            v-if="minionVisible"
            class="minion"
            :style="`top: ${currentMinionIndex === minions.length ? 'calc(100% - 100px)' : minionPosition.y + 'px'}; 
                      left: ${currentMinionIndex === minions.length ? 'calc(50% - 250px)' : minionPosition.x + 'px'}; 
                      width: ${currentMinionIndex === minions.length ? '500px' : '100px'};
                      height: ${currentMinionIndex === minions.length ? 'auto' : '100px'};`"
          >
            <img class="gru" :src="currentMinionIndex === minions.length ? '/images/gru.png' : minions[currentMinionIndex]" alt="Character" />
          </div>
        </div>
        <div class="crosshair"></div>
        <div class="weapon">
          <img src="/images/main.png" alt="Weapon" />
        </div>
        <!-- Explosion image -->
        <div v-if="showExplosion" class="explosion">
          <img src="/images/explosion.png" alt="Explosion" />
        </div>
      </div>
      <button class="close-btn" @click="closeGamePopup">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

// Références réactives
const showPopup = ref(false);
const showErrorMessage = ref(false);
const showGamePopup = ref(false);
const showExplosion = ref(false); // Contrôle de l'affichage de l'explosion
const isChecked = ref(false);
const puzzleImages = ref([
  { src: "/images/pomme.jpg", selected: false },
  { src: "/images/carotte.jpg", selected: false },
  { src: "/images/arme.png", selected: false },
]);

const backgroundOffset = reactive({ x: 0, y: 0 });
const backgroundSize = { width: 2000, height: 1000 }; // Dimensions de l'image de fond
const viewportSize = reactive({ width: window.innerWidth, height: window.innerHeight });

const minionVisible = ref(false);
const minionPosition = reactive({ x: 0, y: 0 });
const explosionPosition = reactive({ x: 0, y: 0 }); // Position de l'explosion
let currentMinionIndex = 0; // Index du minion actuel
let gruCollisionCount = 0; // Compteur de collisions pour Gru

const minions = [
  "/images/minion1.png",
  "/images/minion2.png",
  "/images/minion3.png",
  "/images/minion4.png",
  "/images/minion5.png",
];

// Ouverture et fermeture du puzzle et du jeu
function openPuzzle() {
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
  resetPuzzle();
}

function closeGamePopup() {
  showGamePopup.value = false;
  resetPuzzle();
  resetCharacters(); // Réinitialiser les personnages
}

// Interaction avec le puzzle
function selectTile(index) {
  puzzleImages.value[index].selected = !puzzleImages.value[index].selected;
}

function verifyPuzzle() {
  const selectedImages = puzzleImages.value.filter((tile) => tile.selected);

  if (
    selectedImages.length === 2 &&
    selectedImages[0].src === "/images/pomme.jpg" &&
    selectedImages[1].src === "/images/carotte.jpg"
  ) {
    closePopup();
    isChecked.value = false;
    showErrorMessage.value = true;
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else if (
    selectedImages.length === 1 &&
    selectedImages[0].src === "/images/arme.png"
  ) {
    centerBackground();
    showGamePopup.value = true;
    spawnMinion();
    closePopup();
  } else {
    closePopup();
    isChecked.value = false;
    showErrorMessage.value = true;
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  }
}

// Centrage de l'image de fond
function centerBackground() {
  backgroundOffset.x = (backgroundSize.width - viewportSize.width) / 2;
  backgroundOffset.y = (backgroundSize.height - viewportSize.height) / 2;
}

// Affichage de l'explosion
function handleExplosion(event) {
  explosionPosition.x = viewportSize.width / 2 - 37.5; // Centrer l'image explosion
  explosionPosition.y = viewportSize.height / 2 - 37.5;

  showExplosion.value = true;
  checkCollision();

  setTimeout(() => {
    showExplosion.value = false;
  }, 300);
}

// Vérification du chevauchement
function checkCollision() {
  if (!minionVisible.value) return;

  const minionRect = {
    left: currentMinionIndex === minions.length ? viewportSize.width / 2 - 250 : minionPosition.x,
    right: currentMinionIndex === minions.length ? viewportSize.width / 2 + 250 : minionPosition.x + 100,
    top: currentMinionIndex === minions.length ? backgroundSize.height - 100 : minionPosition.y,
    bottom: currentMinionIndex === minions.length ? backgroundSize.height : minionPosition.y + 100,
  };

  const explosionRect = {
    left: explosionPosition.x,
    right: explosionPosition.x + 75,
    top: explosionPosition.y,
    bottom: explosionPosition.y + 75,
  };

  if (
    minionRect.left <= explosionRect.right &&
    minionRect.right >= explosionRect.left ||
    minionRect.top <= explosionRect.bottom ||
    minionRect.bottom >= explosionRect.top
  ) {
    if (currentMinionIndex === minions.length) {
      // Gru condition
      gruCollisionCount++;
      if (gruCollisionCount >= 3) {
        minionVisible.value = false; // Gru disparaît
        gruCollisionCount = 0; // Réinitialiser le compteur
      }
    } else {
      // Passer au prochain minion
      currentMinionIndex++;
      spawnMinion();
    }
  }
}

// Générer une position aléatoire pour un minion
function getRandomPosition() {
  return {
    x: Math.random() * (700 - 400) + 400,
    y: Math.random() * (400 - 100) + 100,
  };
}

// Réinitialisation des personnages
function resetCharacters() {
  currentMinionIndex = 0;
  gruCollisionCount = 0;
  spawnMinion();
}

// Afficher le minion
function spawnMinion() {
  if (currentMinionIndex > minions.length) return;

  const { x, y } = getRandomPosition();
  Object.assign(minionPosition, { x, y });
  minionVisible.value = true;
}

// Réinitialisation du puzzle
function resetPuzzle() {
  puzzleImages.value.forEach((tile) => {
    tile.selected = false;
  });
}

// Déplacement de l'image de fond
function handleMouseMove(event) {
  const deltaX = event.movementX || 0;
  const deltaY = event.movementY || 0;

  backgroundOffset.x = Math.max(
    Math.min(backgroundOffset.x + deltaX, backgroundSize.width - viewportSize.width),
    0
  );

  backgroundOffset.y = Math.max(
    Math.min(backgroundOffset.y + deltaY, backgroundSize.height - viewportSize.height),
    0
  );
}

// Gestion des événements clavier
function handleKeyDown(event) {
  if (event.key === "Escape" && showGamePopup.value) {
    closeGamePopup();
  }
}

// Attachement des événements
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", () => {
    viewportSize.width = window.innerWidth;
    viewportSize.height = window.innerHeight;
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
.captcha-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

/* Styles pour le popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.grid-item {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.grid-item.selected {
  border: 2px solid blue;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.game-popup {
  cursor: none;
}

.game-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-image {
  position: absolute;
  width: 1000px;
  height: 500px;
  background: url('/images/nuktown.avif') no-repeat;
  background-size: cover;
  top: 30%;
  left: 30%;
  transition: transform 0.1s ease-out;
}

.crosshair {
  position: absolute;
  width: 40px;
  height: 40px;
  background: url('/images/crosshair.png') no-repeat center center;
  background-size: contain;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  pointer-events: none;
}

.weapon {
  position: absolute;
  bottom: 0;
  left: 75%;
  transform: translateX(-50%);
  width: 600px;
  height: auto;
  z-index: 5;
}

.weapon img {
  width: 100%;
  height: auto;
  pointer-events: none;
}

/* Explosion styles */
.explosion {
  position: absolute;
  top: calc(50% + 20px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75px;
  height: 75px;
  z-index: 60;
}

/* Minion styles */
.minion {
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 55;
}

</style>
