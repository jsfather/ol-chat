<script setup lang="ts">
import {faker} from '@faker-js/faker';

const toastStore = useToastStore()

const types = ["info", "error", "success", "warning"];

function getRandomType() {
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

function createFakeToast() {
  toastStore.addToast({
    message: faker.helpers.fake(
        'Hello {{person.prefix}} {{person.lastName}}, how are you today?'
    ), type: getRandomType(), duration: (Math.random() * (20 - 5) + 5) * 1000
  })
}

</script>

<template>
  <button type="button"
          class="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="createFakeToast">
    Show fake toast
  </button>
</template>

<style scoped>

</style>