<script setup lang="ts">
const tagStore = useTagStore()

await callOnce(tagStore.fetchAll)

const selectedTag = ref(tagStore.selectedTag)

watch(selectedTag, (newValue) => {
  tagStore.setSelectedTag(newValue)
});

const message = ref('')

const chatStore = useChatStore()

async function sendMessage() {

  await chatStore.sendMessage({role: 'user', content: message.value})
}
</script>
<template>
  <app-popover v-model="selectedTag" :items="tagStore.tags"/>

  <form class="fixed bottom-6 left-0 right-0 w-1/2 mx-auto" @submit.prevent="sendMessage">
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Icon name="material-symbols:attach-file" size="25" class="text-gray-500"/>
      </div>
      <input v-model="message" type="search" id="default-search"
             class="block w-full p-4 ps-10 text-gray-200 rounded-3xl bg-gray-700 focus:outline-none"
             :placeholder="`Ask ${selectedTag?.details?.family} anything...`" required/>
      <button type="submit"
              class="absolute end-2.5 bottom-3 bg-white disabled:bg-gray-500 rounded-full p-2.5 text-center inline-flex items-center"
              :disabled="message === '' || chatStore.isLoading">
        <Icon name="material-symbols:arrow-upward" size="15"></Icon>
      </button>
    </div>
  </form>

  <div class="p-4 w-full flex flex-col h-full">
      <div v-for="item in chatStore.chatHistory">{{item.content}}</div>
  </div>

</template>
