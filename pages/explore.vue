<script setup lang="ts">
import type {Model} from "~/types/model";

const slms: Model[] = [{
  name: 'Llama',
  models: [
    {name: 'llama3.1', parameters: '8B', size: '4.7GB'},
    {name: 'llama3.1:70b', parameters: '70B', size: '40GB'},
    {name: 'llama3.1:405b', parameters: '405B', size: '231GB'}
  ]
}, {
  name: 'Phi 3',
  models: [
    {name: 'phi3', parameters: '3.8B', size: '2.3GB'},
    {name: 'phi3:medium', parameters: '14B', size: '7.9GB'},
  ]
}]
</script>
<template>
  <div
      class="flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth w-full h-full scrollbar scrollbar-thumb-slate-900 scrollbar-track-transparent pb-4">
    <div class="w-1/2 flex flex-col self-center">
      <div class="text-center text-5xl text-white mt-6">GPTs</div>
      <div class="text-center text-gray-400 mt-2">Discover and create custom versions of ChatGPT that combine
        instructions, extra knowledge, and any
        combination of skills.
      </div>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <app-model-card v-for="item in slms" :model="item"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>