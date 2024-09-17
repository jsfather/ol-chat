<template>
  <aside class="w-64 bg-gray-900">
    <div class="space-y-2 font-medium h-full px-3 py-4 overflow-y-auto">
      <NuxtLink
          :to="{name: 'index'}"
          class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <Icon name="simple-icons:ollama" size="20"/>
        <span class="ms-3">Chat</span>
      </NuxtLink>
      <NuxtLink
          :to="{name: 'explore'}"
          class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <Icon name="mage:dashboard-4" size="20"/>
        <span class="ms-3">Explore SLMs</span>
      </NuxtLink>
      <NuxtLink
          :to="{name: 'settings'}"
          class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <Icon name="icon-park-outline:config" size="20"/>
        <span class="ms-3">Settings</span>
      </NuxtLink>
    </div>
  </aside>
</template>
<script setup lang="ts">
</script>