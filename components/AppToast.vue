<script setup lang="ts">
function getTypeColor(type: string) {
  switch (type) {
    case 'success':
      return 'bg-green-300'
    case 'error':
      return 'bg-red-300'
    case 'warning':
      return 'bg-orange-300'
    case 'info':
      return 'bg-sky-300'
    default:
      return 'bg-gray-200'
  }
}

function getTypeTextColor(type: string) {
  switch (type) {
    case 'success':
      return 'text-green-300'
    case 'error':
      return 'text-red-300'
    case 'warning':
      return 'text-orange-300'
    case 'info':
      return 'text-sky-300'
    default:
      return 'text-gray-300'
  }
}

function getTypeIconColor(type: string) {
  switch (type) {
    case 'success':
      return 'bg-green-800'
    case 'error':
      return 'bg-red-800'
    case 'warning':
      return 'bg-orange-800'
    case 'info':
      return 'bg-sky-800'
    default:
      return 'bg-gray-800'
  }
}

const toastStore = useToastStore()
const [parentToast] = useAutoAnimate()
</script>

<template>
  <div ref="parentToast" class="flex flex-col fixed top-0 right-4 w-full max-w-xs">
    <div v-for="(item, item_index) in toastStore.toasts" class="mt-4 flex items-center p-4 rounded-lg shadow"
         :class="getTypeColor(item.type)"
         role="alert">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
           :class="`${getTypeIconColor(item.type)} ${getTypeTextColor(item.type)}`">
        <Icon v-if="item.type === 'error'" name="material-symbols:error" size="24"></Icon>
        <Icon v-if="item.type === 'warning'" name="material-symbols:warning" size="24"></Icon>
        <Icon v-if="item.type === 'info'" name="material-symbols:info" size="24"></Icon>
        <Icon v-if="item.type === 'success'" name="material-symbols:check-circle" size="24"></Icon>
      </div>
      <div class="ms-3 text-sm font-normal">{{ item.message }}</div>
      <button type="button" class="ms-auto inline-flex hover:text-gray-600" @click="toastStore.deleteToast(item_index)">
        <Icon name="material-symbols:close" size="24"></Icon>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>