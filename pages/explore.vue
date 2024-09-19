<script setup lang="ts">
import type {Tag} from "~/types/tag";

const tagStore = useTagStore()

await callOnce(tagStore.fetchAll)

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
}, {
  name: "qwen2:0.5b",
  model: "qwen2:0.5b",
  modified_at: new Date("2024-09-17T14:16:53.659402907+03:30"),
  size: 352164041,
  digest: "6f48b936a09f7743c7dd30e72fdb14cba296bc5861902e4d0c387e8fb5050b39",
  details: {
    parent_model: "",
    format: "gguf",
    family: "qwen2",
    families: [
      "qwen2"
    ],
    parameter_size: "494.03M",
    quantization_level: "Q4_0"
  }
},
  {
    name: "gemma2:2b",
    model: "gemma2:2b",
    modified_at: new Date("2024-09-18T09:31:52.325398247+03:30"),
    size: 1629518495,
    digest: "8ccf136fdd5298f3ffe2d69862750ea7fb56555fa4d5b18c04e3fa4d82ee09d7",
    details: {
      parent_model: "",
      format: "gguf",
      family: "gemma2",
      families: [
        "gemma2"
      ],
      parameter_size: "2.6B",
      quantization_level: "Q4_0"
    }
  }
]
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