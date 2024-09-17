<script setup lang="ts">
import type {Tag} from "~/types/tag";

const models: Tag[] = [{
  name: "phi3:mini",
  model: "phi3:mini",
  modified_at: new Date("2024-09-16T16:53:18.5079088+03:30"),
  size: 2176178913,
  digest: "4f222292793889a9a40a020799cfd28d53f3e01af25d48e06c5e708610fc47e9",
  details: {
    parent_model: "",
    format: "gguf",
    family: "phi3",
    families: [
      "phi3"
    ],
    parameter_size: "3.8B",
    quantization_level: "Q4_0"
  }
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
        <app-model-card v-for="model in models" :model="model"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>