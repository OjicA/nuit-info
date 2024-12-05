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
    <div v-if="showGamePopup" class="popup-overlay game-popup" @mousemove="handleMouseMove" @keydown.esc="closeGamePopup">
      <div class="game-container">
        <div
          class="background-image"
          :style="`transform: translate(${-backgroundOffset.x}px, ${-backgroundOffset.y}px)`"
        ></div>
        <div class="crosshair"></div>
        <div class="weapon">
          <img src="/images/main.png" alt="Weapon" />
        </div>
      </div>
      <button class="close-btn" @click="closeGamePopup">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

// Références réactives
const showPopup = ref(false);
const showErrorMessage = ref(false);
const showGamePopup = ref(false);
const isChecked = ref(false);
const puzzleImages = ref([
  { src: "/images/pomme.jpg", selected: false },
  { src: "/images/carotte.jpg", selected: false },
  { src: "/images/arme.png", selected: false },
]);

const backgroundOffset = reactive({ x: 0, y: 0 });
const backgroundSize = { width: 2000, height: 1000 }; // Dimensions de l'image de fond
const viewportSize = reactive({ width: window.innerWidth, height: window.innerHeight });

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
    showGamePopup.value = true;
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

// Déplacement de l'image de fond
function handleMouseMove(event) {
  // Calcul de la position relative de la souris dans le viewport
  const relativeX = event.clientX / viewportSize.width;
  const relativeY = event.clientY / viewportSize.height;

  // Mise à jour du décalage de l'image de fond
  backgroundOffset.x = Math.min(
    Math.max(relativeX * (backgroundSize.width - viewportSize.width), 0),
    backgroundSize.width - viewportSize.width
  );

  backgroundOffset.y = Math.min(
    Math.max(relativeY * (backgroundSize.height - viewportSize.height), 0),
    backgroundSize.height - viewportSize.height
  );
}

// Réinitialisation du puzzle
function resetPuzzle() {
  puzzleImages.value.forEach((tile) => {
    tile.selected = false;
  });
}

// Gestion des événements clavier
function handleKeyDown(event) {
  if (event.key === "Escape" && showGamePopup.value) {
    closeGamePopup();
  }
}

// Attachement des événements clavier
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
</style>
