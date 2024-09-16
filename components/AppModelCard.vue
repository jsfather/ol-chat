<script setup lang="ts">
import type {Model} from "~/types/model";

const props = withDefaults(defineProps<{ model: Model }>(), {})

const selectedModel = ref<{ name: string, parameters: string, size: string } | null>(props.model.models[0])
</script>

<template>
  <div class="p-4 rounded-2xl hover:bg-slate-700 flex flex-row items-center justify-between">
    <div class="flex flex-col h-full">
      <div class="text-white text-2xl">{{ model.name }}</div>
      <div class="flex flex-row flex-wrap gap-4 mt-2">
        <div v-for="item in model.models"
             class="rounded-md py-0.5 px-2.5 border border-transparent text-sm text-gray-400 transition-all text-nowrap cursor-pointer select-none"
             :class="{'bg-slate-900 text-white': isEqual(item , selectedModel)}"
             @click="isEqual(item , selectedModel) ? selectedModel = null : selectedModel = item">
          {{ item.parameters }} : {{ item.size }}
        </div>
      </div>
    </div>
    <button :disabled="!selectedModel" class="text-primary disabled:text-gray-500">
      <Icon name="material-symbols:download" size="30"></Icon>
    </button>

  </div>
</template>

<style scoped>

</style>