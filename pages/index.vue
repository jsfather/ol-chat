<script setup lang="ts">
const tagStore = useTagStore()

await callOnce(tagStore.fetchAll)

const selectedTag = ref(tagStore.selectedTag)

watch(selectedTag, (newValue) => {
  tagStore.setSelectedTag(newValue)
});
</script>
<template>
  <app-popover v-model="selectedTag" :items="tagStore.tags"/>
</template>
