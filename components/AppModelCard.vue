<script setup lang="ts">
import type {Tag} from "~/types/tag";
import {bytesToGB} from "~/utils";

const props = withDefaults(defineProps<{ model: Tag }>(), {})
</script>

<template>
  <div class="p-4 rounded-2xl hover:bg-slate-700 flex flex-row items-center justify-between">
    <div class="flex flex-col h-full">
      <div class="text-white text-2xl">{{ model.name }}</div>
      <div class="text-gray-400 text-sm mt-1">{{ model.details.family }}</div>
      <div class="flex flex-row flex-wrap gap-2 mt-2">
        <app-chips>
          {{ model.details.parameter_size }}
        </app-chips>
        <app-chips>
          {{bytesToGB(model.size)}}GB
        </app-chips>
        <app-chips>
          {{ model.details.quantization_level }}
        </app-chips>
      </div>
    </div>
    <button class="text-primary disabled:text-gray-500">
      <Icon name="material-symbols:download" size="30"></Icon>
    </button>

  </div>
</template>

<style scoped>

</style>