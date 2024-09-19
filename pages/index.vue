<script setup lang="ts">
const tagStore = useTagStore()

await callOnce(tagStore.fetchAll)

const selectedTag = ref(tagStore.selectedTag)

watch(selectedTag, (newValue) => {
  tagStore.setSelectedTag(newValue)
});

const pageTitle = computed(() => {
  return 'Ask ' + tagStore.selectedTag.name + '...'
})

useHead({
  title: pageTitle
})

const message = ref('')
const messageRef = ref()

const chatStore = useChatStore()

async function sendMessage() {
  let tempMessage = message.value
  message.value = ''
  await chatStore.sendMessage({role: 'user', content: tempMessage}).then(() => {
    scrollToEnd('chat')
    messageRef.value.focus();
  })
}

function scrollToEnd(elementId: string) {
  const element = document.getElementById(elementId)
  element ? element.scrollTop = element.offsetHeight + element.scrollHeight : null
}
</script>
<template>
  <div>
    <app-popover v-model="selectedTag" :items="tagStore.tags" class="mx-3 my-2"/>
    <div class="w-full flex flex-col justify-between h-[calc(100vh-60px)]">
      <div id="chat"
           class="flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth w-full h-full scrollbar scrollbar-thumb-slate-900 scrollbar-track-transparent pb-4">
        <div class="w-1/2 flex flex-col self-center">
          <div v-for="item in chatStore.chatHistory"
               class="px-4 py-2 text-gray-200 w-fit max-w-screen-lg my-2 text-wrap"
               :class="item.role ==='user' ? 'self-end bg-gray-600 rounded-3xl' : 'self-start mt-6'">{{ item.content }}
          </div>
        </div>
      </div>
      <form class="w-1/2 mx-auto pb-6" @submit.prevent="sendMessage">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon name="material-symbols:attach-file" size="25" class="text-gray-500"/>
          </div>
          <input ref="messageRef" v-model="message"
                 class="block w-full p-4 ps-10 text-gray-200 rounded-3xl bg-gray-700 focus:outline-none"
                 :placeholder="`${selectedTag?.model  ? `Ask ${selectedTag?.details?.family} anything...` : 'Select a model to continue' }`"
                 required
                 :disabled="chatStore.isLoading || !selectedTag?.model"/>
          <button type="submit"
                  class="absolute end-2.5 bottom-3 bg-white disabled:bg-gray-500 rounded-full p-2.5 text-center inline-flex items-center"
                  :disabled="message === '' || chatStore.isLoading">
            <Icon v-if="!chatStore.isLoading" name="material-symbols:arrow-upward" size="15"></Icon>
            <Icon v-else name="material-symbols:square-rounded" size="15" class="text-gray-300"></Icon>
          </button>
        </div>
      </form>
    </div>


  </div>
</template>
