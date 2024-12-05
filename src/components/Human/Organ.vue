<script setup lang="ts">
defineProps<{
  name: string
  top: number | string
  left: number | string
}>()

defineEmits<{
  click: [string]
}>()
</script>

<template>
  <img :src="`/assets/images/${name}.png`"
       :alt="name"
       class="absolute origin-center w-16 hover:scale-150"
       :style="{ top: `${top}vh`, left: `${left}vw` }"
       @click="$emit('click', name)" />
</template>

<style scoped>

</style>