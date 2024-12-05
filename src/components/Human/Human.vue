<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

type refImage = {
  [key: string]: {
    showed: boolean;
    url: string;
  }
}

const imagesShowed = ref<refImage>({
  heart: {
    showed: true,
    url: '/assets/images/heart.png'
  },
  brain: {
    showed: true,
    url: '/assets/images/brain.png'
  },
  lung: {
    showed: true,
    url: '/assets/images/lung.png'
  },
  stomac: {
    showed: true,
    url: '/assets/images/stomac.png'
  }
})
const bodyShowed = ref(true)
const organSelected = ref<{
  showed: boolean;
  url: string;
} | null>(null)

const clickOnOrgan = (organ: 'heart' | 'brain' | 'lung' | 'stomac') => {
  Object.keys(imagesShowed.value).forEach((key: string) => {
    if (key !== organ) {
      imagesShowed.value[key].showed = false
    } else {
      imagesShowed.value[key].showed = true
      organSelected.value = imagesShowed.value[key]
    }
  })
  zoom.value = true
  setTimeout(() => {
    bodyShowed.value = false
  }, 750)
}

const zoom = ref(false)
</script>

<template>
  <!-- <Button v-if="!bodyShowed" class="static m-3" @click="bodyShowed = true; zoom = false;">Retour</Button> -->
  <main :class="'w-screen h-screen flex justify-center items-center bg-teal-50' + (zoom ? ' overflow-hidden' : '')">
    <div :class="(zoom ? 'overflow-hidden zoom-in ' : '') + 'human-body z-10'" v-if="bodyShowed">
      <img src="/assets/images/heart.png" alt="Heart" :class="`relative origin-center w-10 hover:scale-150 heart`" @click="clickOnOrgan('heart')" />
      <img src="/assets/images/brain.png" alt="Brain" :class="`relative origin-center w-14 hover:scale-150 brain`" @click="clickOnOrgan('brain')" />
      <img src="/assets/images/lung.png" alt="Lung" :class="`relative origin-center w-14 hover:scale-150 lung`" @click="clickOnOrgan('lung')" />
      <img src="/assets/images/stomac.png" alt="Stomac" :class="`relative origin-center w-14 hover:scale-150 stomac`" @click="clickOnOrgan('stomac')" />
    </div>
    <div v-if="!bodyShowed" class="w-full h-full flex justify-between items-center px-12 text-black appear">
      <div class="flex flex-col border-4 w-full mr-48 rounded-md h-1/3">
        <div class="border-b-4">Corps humain</div>
        <div class="flex-1">
          Le cors humain blablabla
        </div>
      </div>
      <div class="w-1/6">
        <img :src="organSelected?.url" alt="Organ" class="pulser w-full" />
      </div>
      <div class="flex flex-col border-4 w-full ml-48 rounded-md h-1/3">
        <div class="border-b-4">Corps humain</div>
        <div class="flex-1">
          Le cors humain blablabla
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.human-body {
  width: 289px;
  height: 689px;
  background-image: url('/assets/images/human-body.png');
  background-size: contain;
  background-repeat: no-repeat;

  &.zoom-in {
    animation: zoom-in-anim 0.75s forwards;
  }

  img {
    transition: all 0.5s;
    cursor: pointer;

    &.heart {
      top: 20%;
      right: -55%;
    }

    &.brain {
      top: -7.5%;
      right: -37.5%;
    }

    &.lung {
      top: 5%;
      left: 37.5%;
    }

    &.stomac {
      top: 11%;
      right: -38.5%;
    }
  }
}

.appear {
  animation: appears 1s forwards;
}

.disappear {
  animation: appears 0.2s reverse forwards;
}

.pulser {
  animation: pulser 1s infinite alternate;
}

@keyframes zoom-in-anim {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes appears {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulser {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
</style>
