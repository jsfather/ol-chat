<script setup lang="ts">
import type {Tag} from "~/types/tag";
import {bytesToGB} from "~/utils";
import ollama from "ollama";
import type {Error} from "~/types/error";

const props = withDefaults(defineProps<{ model: Tag }>(), {})
const toastStore = useToastStore()
const tagStore = useTagStore()
const downloadLoading = ref(false)
const downloadProgress = ref()

async function downloadModel(model: string) {
  downloadLoading.value = true
  try {
    const response = await ollama.pull({
      model,
      stream: true
    })
    for await (const part of response) {
      if (part.status.indexOf('pulling') !== -1 && part.total != undefined) {
        if (part.status === 'success') {
          downloadLoading.value = false
        } else {
          downloadProgress.value = part.completed / part.total * 100
          console.log(part)
          console.log(downloadProgress.value)
        }
      }
    }
  } catch (error: Error | any) {
    downloadLoading.value = false
    toastStore.addToast({message: error.message, type: 'error'})
  } finally {
    downloadLoading.value = false
  }
}

const isDownloaded = computed(() => {
  return tagStore.tags.some(item => item.model === props.model.model)
})
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
          {{ bytesToGB(model.size) }}GB
        </app-chips>
        <app-chips>
          {{ model.details.quantization_level }}
        </app-chips>
      </div>
    </div>
    <button :disabled="isDownloaded || downloadLoading"
            class="text-primary disabled:text-gray-500"
            @click="downloadModel(props.model.model)">
      <Icon v-if="!isDownloaded && !downloadLoading" name="material-symbols:download" size="30"></Icon>
      <app-circular-progress v-else-if="downloadLoading" :progress="downloadProgress" size="25"/>
      <Icon v-if="isDownloaded" name="material-symbols:download-done" size="30"></Icon>
    </button>

  </div>
</template>

<style scoped>

</style>