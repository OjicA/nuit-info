<script setup lang="ts">
import Button from 'primevue/button'
import { computed, readonly } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const metadata = readonly<Record<string, { human: string, ocean: string }>>({
  brain: {
    human: 'Le cerveau est un composant vital du corps humain',
    ocean: 'L\'eau est un composant vital des océans'
  },
  heart: {
    human: 'Le coeur est un composant vital du corps humain',
    ocean: 'L\'eau est un composant vital des océans'
  },
  lung: {
    human: 'Les poumons sont un composant vital du corps humain',
    ocean: 'L\'eau est un composant vital des océans'
  },
  stomac: {
    human: 'L\'estomac est un composant vital du corps humain',
    ocean: 'L\'eau est un composant vital des océans'
  },
})

const organName = computed(() => route.params.organ as string)

function back() {
  router.push({ name: 'human' })
}
</script>

<template>
  <Button class="static m-3" @click="back()">Retour</Button>
  <main :class="['w-screen', 'h-screen', 'flex', 'justify-center', 'items-center', 'bg-teal-50']">
    <div class="w-full h-full flex justify-between items-center px-12 text-black appear">
      <div class="flex flex-col border-4 w-full mr-48 rounded-md h-1/3">
        <div class="text-center border-b-4">Corps humain</div>
        <div class="flex-1">
          {{ metadata[organName].human ?? 'blablabla' }}
        </div>
      </div>
      <div class="w-1/6">
        <img :src="`/assets/images/${organName}.png`" alt="Organ" class="pulser w-full" />
      </div>
      <div class="flex flex-col border-4 w-full ml-48 rounded-md h-1/3">
        <div class="text-center border-b-4">Océan</div>
        <div class="flex-1">
          {{ metadata[organName].ocean ?? 'blablabla' }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>