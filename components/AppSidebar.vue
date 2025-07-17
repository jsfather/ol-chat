<template>
  <aside class="w-64 bg-gray-900 h-full">
    <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-700">
      <h2 class="text-white font-semibold">Menu</h2>
      <button @click="$emit('close')" class="text-gray-400 hover:text-white">
        <Icon name="material-symbols:close" size="24" />
      </button>
    </div>

    <div class="space-y-2 font-medium h-full px-3 py-4 overflow-y-auto">
      <NuxtLink
          :to="{name: 'index'}"
          class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200 group"
          @click="$emit('close')">
        <Icon name="simple-icons:ollama" size="20"/>
        <span class="ms-3">Chat</span>
      </NuxtLink>
      <NuxtLink
          :to="{name: 'explore'}"
          class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200 group"
          @click="$emit('close')">
        <Icon name="mage:dashboard-4" size="20"/>
        <span class="ms-3">Explore SLMs</span>
      </NuxtLink>
<!--      <NuxtLink-->
<!--          :to="{name: 'settings'}"-->
<!--          class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200 group"-->
<!--          @click="$emit('close')">-->
<!--        <Icon name="icon-park-outline:config" size="20"/>-->
<!--        <span class="ms-3">Settings</span>-->
<!--      </NuxtLink>-->
    </div>
  </aside>
</template>
<script setup lang="ts">
defineEmits<{
  close: []
}>()
</script>