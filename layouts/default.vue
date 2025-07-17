<template>
  <div class="flex h-screen">
    <div v-if="sidebarOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="sidebarOpen = false"></div>
      <div class="fixed left-0 top-0 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out">
        <app-sidebar @close="sidebarOpen = false"/>
      </div>
    </div>
    <div class="hidden lg:block">
      <app-sidebar/>
    </div>
    <main class="flex-1 bg-slate-800 flex flex-col min-w-0">
      <div class="lg:hidden bg-gray-900 p-4 flex items-center justify-between border-b border-gray-700">
        <button @click="sidebarOpen = true" class="text-white p-2">
          <Icon name="material-symbols:menu" size="24"/>
        </button>
        <h1 class="text-white font-semibold">Ol-Chat</h1>
        <div class="w-10"></div>
      </div>

      <div class="flex-1 min-h-0">
        <NuxtPage/>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)

const route = useRoute()
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>