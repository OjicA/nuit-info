<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push({ name: 'human' })
}
</script>

<template>
  <Button class="static m-3" @click="back()">Retour</Button>
  <main :class="['w-screen', 'h-screen', 'flex', 'justify-center', 'items-center', 'bg-teal-50']">
    <div class="w-full h-full flex justify-between items-center px-12 text-black appear">
      <div class="flex flex-col border-4 w-full mr-48 rounded-md h-1/3">
        <div class="border-b-4">Corps humain</div>
        <div class="flex-1">
          Le corps humain blablabla
        </div>
      </div>
      <div class="w-1/6">
        <img :src="`/assets/images/${$route.params.organ}.png`" alt="Organ" class="pulser w-full" />
      </div>
      <div class="flex flex-col border-4 w-full ml-48 rounded-md h-1/3">
        <div class="border-b-4">Océan</div>
        <div class="flex-1">
          L'océan blablabla
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>