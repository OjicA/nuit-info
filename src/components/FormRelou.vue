<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { nextTick, onMounted, ref } from 'vue';

const output = ref('');

const rows = ref([
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'RETOUR'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', ''],
    ['W', 'X', 'C', 'V', 'B', 'N', ',', ';', ':', '!', '']
]);

const reponse = ref(''); // Réponse à taper

const nbLettresReponse = ref(Math.floor(Math.random() * 8) + 3); // Nombre de lettres à taper

const retourner = ref(0);
 
function handleKeyPress(key: string) {
    const random = getRandomZeroOrOne();
    const random2 = getRandomZeroOrOne();
    if (key === 'RETOUR') {
        output.value = random === 0 ? output.value.slice(0, -1) : output.value.slice(0, -2);
    } else {
        output.value += random === 0 ? key : getRandomLetter();
    }
    randomizeRows(); // Mélange les lignes à chaque touche appuyée
    
    if (random2 === 1) {
        retourner.value = retourner.value === 0 ? 1 : 0;
    }

    if (output.value === reponse.value) {
        nextTick(() => {
            alert('Bravo !')
            output.value = '';
            randomizeReponse();
        })
    }
}

function randomizeReponse() {
    for(let i = 0; i < nbLettresReponse.value; i++) {
        reponse.value += getRandomLetter();
    }
}

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomZeroOrOne(probability = 0.7) {
    return Math.random() < probability ? 0 : 1;
}

// Fonction pour sélectionner une lettre aléatoire
function getRandomLetter() {
    const flatKeys = rows.value.flat(); // Aplatir les touches
    const randomIndex = Math.floor(Math.random() * flatKeys.length);
    return flatKeys[randomIndex];
}

// Fonction pour randomiser toutes les lignes
function randomizeRows() {
    rows.value = rows.value.map(row => shuffleArray([...row])); // Copie et mélange chaque ligne
}

onMounted(() => {
    randomizeReponse();
})

</script>

<template>
    <div :class="'h-screen w-screen flex flex-col items-center gap-5 justify-center ' + (retourner === 1 ? 'retourner' : '')">
        <div class="flex justify-center items-center">
            <span class="text-white">Réponse à taper : {{ reponse }}</span>
        </div>
        <InputText  v-model="output" :disabled="true" :invalid="reponse !== output" />
        <div class="keyboard-container flex flex-col items-center fixed bottom-0 w-full mb-4">
            <!-- Affichage de la sortie -->
            
            <!-- Affichage des touches -->
            <div v-for="inputs in rows" :class="'keyboard-row flex blink '  + (retourner === 1 ? 'text-4xl' : '')">
                <div
                    v-for="key in inputs"
                    :key="key"
                    class="keyboard-key px-4 bg-slate-500 rounded-md m-1">
                    <span class="hover:cursor-pointer" :style="'color: #' + Math.floor(Math.random()*16777215).toString(16)" @click="handleKeyPress(key)">{{ key }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .blink {
        animation: blink 1s linear infinite;
    }

    .retourner {
        animation: retourner 1s linear forwards;
        &.reretourner {
            animation: retourner 1s linear reverse forwards;
        }
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        80% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes retourner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }
</style>