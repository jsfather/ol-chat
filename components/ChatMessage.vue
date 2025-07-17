<template>
  <div class="chat-message-container" :class="messageClass">
    <div class="message-wrapper">
      <div class="avatar" :class="avatarClass">
        <Icon v-if="message.role === 'user'" name="mdi:account" size="20" />
        <Icon v-else name="simple-icons:ollama" size="20" />
      </div>

      <div class="message-content">
        <div class="message-header">
          <span class="sender-name">{{ message.role === 'user' ? 'You' : 'Assistant' }}</span>
          <div class="message-actions">
            <button 
              @click="copyMessage" 
              class="copy-btn"
              :class="{ 'copied': isCopied }"
              title="Copy message"
            >
              <Icon v-if="!isCopied" name="mdi:content-copy" size="16" />
              <Icon v-else name="mdi:check" size="16" />
              <span class="copy-text">{{ isCopied ? 'Copied!' : 'Copy' }}</span>
            </button>
          </div>
        </div>
        
        <div class="message-body">
          <div v-if="message.role === 'user'" class="user-message">
            {{ message.content }}
          </div>

          <div 
            v-else 
            class="assistant-message prose prose-invert max-w-none"
            v-html="renderedContent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  role: string
  content: string
}

const props = defineProps<{
  message: Message
}>()

const { renderMarkdown } = useMarkdown()
const isCopied = ref(false)

const messageClass = computed(() => ({
  'user-message-container': props.message.role === 'user',
  'assistant-message-container': props.message.role !== 'user'
}))

const avatarClass = computed(() => ({
  'user-avatar': props.message.role === 'user',
  'assistant-avatar': props.message.role !== 'user'
}))

const renderedContent = computed(() => {
  if (props.message.role === 'user') return ''
  return typeof props.message.content === 'string' ? renderMarkdown(props.message.content) : ''
})

const copyMessage = async () => {
  try {
    await navigator.clipboard.writeText(props.message.content)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy message:', error)
    const textArea = document.createElement('textarea')
    textArea.value = props.message.content
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError)
    }
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
.chat-message-container {
  @apply mb-4 sm:mb-6 w-full px-2 sm:px-0;
}

.user-message-container {
  @apply flex justify-end;
}

.assistant-message-container {
  @apply flex justify-start;
}

.message-wrapper {
  @apply flex gap-2 sm:gap-3 max-w-full sm:max-w-4xl;
}

.user-message-container .message-wrapper {
  @apply flex-row-reverse;
}

.avatar {
  @apply flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center;
}

.user-avatar {
  @apply bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg;
}

.assistant-avatar {
  @apply bg-gradient-to-br from-gray-600 to-gray-700 text-gray-200 shadow-lg;
}

.message-content {
  @apply flex-1 min-w-0;
}

.message-header {
  @apply flex items-center justify-between mb-1 sm:mb-2;
}

.sender-name {
  @apply text-xs sm:text-sm font-medium text-gray-400;
}

.message-actions {
  @apply flex items-center gap-1 sm:gap-2;
}

.copy-btn {
  @apply flex items-center gap-1 px-1.5 sm:px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-all duration-200;
}

.copy-btn.copied {
  @apply text-green-400;
}

.copy-text {
  @apply hidden sm:inline;
}

.message-body {
  @apply relative;
}

.user-message {
  @apply bg-gradient-to-br from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tr-sm shadow-lg;
}

.assistant-message {
  @apply bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tl-sm shadow-lg;
}

/* Override prose styles for better integration */
.assistant-message :deep(p) {
  @apply mb-3 last:mb-0;
}

.assistant-message :deep(ul), 
.assistant-message :deep(ol) {
  @apply mb-3 pl-4;
}

.assistant-message :deep(li) {
  @apply mb-1;
}

.assistant-message :deep(h1),
.assistant-message :deep(h2),
.assistant-message :deep(h3),
.assistant-message :deep(h4),
.assistant-message :deep(h5),
.assistant-message :deep(h6) {
  @apply mb-2 mt-4 first:mt-0;
}

.assistant-message :deep(blockquote) {
  @apply border-l-4 border-gray-600 pl-4 italic text-gray-300 my-3;
}
</style>
