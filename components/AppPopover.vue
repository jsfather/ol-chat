<script setup lang="ts">
</script>

<template>
  <HeadlessPopover class="relative">
    <HeadlessPopoverButton
        class="inline-flex items-center rounded-lg px-3 py-2 text-gray-300 font-bold text-lg focus:outline-none hover:bg-slate-700 focus:bg-slate-700"
    >
      <span>Select Chat</span>
      <Icon
          name="mdi:chevron-down"
          class="ml-2 h-5 w-5 transition duration-150 ease-in-out text-base"
          aria-hidden="true"
      />
    </HeadlessPopoverButton>

    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
    >
      <HeadlessPopoverPanel
          class="z-10 mt-3 max-w-sm"
      >
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
          <div class="relative grid bg-white p-2">
            <a
                v-for="item in 4"
                :key="item"
                class="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
            >
              <Icon name="arcticons:ai-chat" size="25" class="text-gray-500"></Icon>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">
                  {{ item }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </HeadlessPopoverPanel>
    </transition>
  </HeadlessPopover>
</template>


