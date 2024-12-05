<script setup lang="ts">
import Organ from '@/components/Human/Organ.vue'
import { reactive, ref } from 'vue'
import Button from 'primevue/button'

type OrganType = { showed: boolean; url: string; }
type RefImage = {
  [key: string]: OrganType
}

const imagesShowed = reactive<RefImage>({
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
const organSelected = ref<OrganType>()

const clickOnOrgan = (organ: 'heart' | 'brain' | 'lung' | 'stomac') => {
  Object.entries(imagesShowed).forEach(([key, value]) => {
    if (key !== organ) {
      value.showed = false
    } else {
      value.showed = true
      organSelected.value = value
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
  <Button v-if="!bodyShowed" class="static m-3" @click="bodyShowed = true; zoom = false;">Retour</Button>
  <main :class="['w-screen', 'h-screen', 'flex', 'justify-center', 'items-center', 'bg-teal-50', (zoom ? 'overflow-hidden' : '')]">
    <div v-if="bodyShowed" :class="[...(zoom ? ['overflow-hidden', 'zoom-in'] : []), 'human-body', 'z-10']">
      <Organ name="brain" top="21" left="47.9" @click="clickOnOrgan('brain')" />
      <Organ name="heart" top="34" left="50" @click="clickOnOrgan('heart')" />
      <Organ name="lung" top="37" left="47" @click="clickOnOrgan('lung')" />
      <Organ name="stomac" top="46" left="48" @click="clickOnOrgan('stomac')" />
    </div>

    <div v-if="!bodyShowed" class="w-full h-full flex justify-between items-center px-12 text-black appear">
      <div class="flex flex-col border-4 w-full mr-48 rounded-md h-1/3">
        <div class="border-b-4">Corps humain</div>
        <div class="flex-1">
          Le corps humain blablabla
        </div>
      </div>
      <div class="w-1/6">
        <img :src="organSelected?.url" alt="Organ" class="pulser w-full" />
      </div>
      <div class="flex flex-col border-4 w-full ml-48 rounded-md h-1/3">
        <div class="border-b-4">Corps humain</div>
        <div class="flex-1">
          Le corps humain blablabla
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
