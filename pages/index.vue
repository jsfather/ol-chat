<script setup lang="ts">
const tagStore = useTagStore()
await callOnce(tagStore.fetchAll)

const selectedTag = ref(tagStore.selectedTag)
watch(selectedTag, (newValue) => tagStore.setSelectedTag(newValue))

const pageTitle = computed(() => {
  return 'Ask ' + (tagStore.selectedTag?.name ?? 'me') + '...'
})
useHead({ title: pageTitle })

const message = ref('')
const messageRef = ref()

const chatStore = useChatStore()
const { renderMarkdown } = useMarkdown()

async function sendMessage() {
  const tempMessage = message.value
  message.value = ''
  await chatStore.sendMessage({ role: 'user', content: tempMessage }).then(() => {
    scrollToEnd('chat')
    messageRef.value.focus()
  })
}

function scrollToEnd(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) element.scrollTop = element.scrollHeight
}
</script>

<template>
  <div>
    <app-popover v-model="selectedTag" :items="tagStore.tags" class="mx-3 my-2" />

    <div class="w-full flex flex-col h-full lg:h-[calc(100vh-60px)]">
      <div
          id="chat"
          class="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth w-full scrollbar scrollbar-thumb-slate-900 scrollbar-track-transparent py-4"
      >
        <div class="max-w-4xl mx-auto w-full px-2 sm:px-4">
          <!-- Welcome message when no chat history -->
          <div v-if="chatStore.chatHistory.length === 0" class="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12">
            <Icon name="simple-icons:ollama" size="48" class="sm:w-16 sm:h-16 text-gray-600 mb-4" />
            <h2 class="text-xl sm:text-2xl font-bold text-gray-300 mb-2">Welcome to Ol-Chat</h2>
            <p class="text-sm sm:text-base text-gray-500 mb-4 px-4">Start a conversation with your {{selectedTag?.name}}</p>
            <div v-if="!selectedTag?.model" class="text-yellow-500 text-xs sm:text-sm px-4">
              Please select a model from the dropdown above to begin
            </div>
          </div>

          <!-- Chat messages -->
          <div v-else class="space-y-1">
            <ChatMessage
              v-for="(item, index) in chatStore.chatHistory"
              :key="index"
              :message="item"
            />
          </div>

          <!-- Loading indicator -->
          <div v-if="chatStore.isLoading" class="flex justify-start mb-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <Icon name="simple-icons:ollama" size="20" class="text-gray-300" />
              </div>
              <div class="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div class="flex items-center gap-2">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                  <span class="text-gray-400 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 bg-slate-800 p-2 sm:p-4">
        <form class="max-w-4xl mx-auto" @submit.prevent="sendMessage">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
              <Icon name="material-symbols:chat" size="18" class="sm:w-5 sm:h-5 text-gray-500" />
            </div>
            <input
                ref="messageRef"
                v-model="message"
                class="block w-full pl-10 sm:pl-12 pr-12 sm:pr-16 py-3 sm:py-4 text-sm sm:text-base text-gray-200 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
                :placeholder="`${selectedTag?.model ? `Ask ${selectedTag?.details?.family} anything...` : 'Select a model to continue'}`"
                required
                :disabled="chatStore.isLoading || !selectedTag?.model"
            />
            <button
                type="submit"
                class="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-xl p-2 sm:p-2.5 text-white transition-all duration-200 flex items-center justify-center"
                :disabled="message.trim() === '' || chatStore.isLoading || !selectedTag?.model"
            >
              <Icon v-if="!chatStore.isLoading" name="material-symbols:send" size="16" class="sm:w-[18px] sm:h-[18px]" />
              <Icon v-else name="material-symbols:stop" size="16" class="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
