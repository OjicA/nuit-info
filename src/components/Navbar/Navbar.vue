<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { PrimeIcons } from '@primevue/core/api'

const items = ref<MenuItem[]>([
  { label: 'Page principale', icon: PrimeIcons.HOME, route: { name: 'human' } },
  { label: 'Bonne chance', route: { name: 'input' } },
  { label: 'Button 3' },
])
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
  </Menubar>
</template>