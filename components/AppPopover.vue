<script setup lang="ts">
interface Item {
  name: string,
  model: string
}

const props = withDefaults(defineProps<{ items?: Item[] }>(), {})

const model = defineModel<Item>()

function updateModel(value: Item) {
  model.value = value
}

</script>

<template>
  <HeadlessPopover class="relative">
    <HeadlessPopoverButton
        class="inline-flex items-center rounded-lg px-3 py-2 text-gray-300 font-bold text-lg focus:outline-none hover:bg-slate-700 focus:bg-slate-700"
    >
      <span>{{ model ? model?.name : 'Select' }}</span>
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
          class="z-10 mt-3 absolute left-0 w-1/3"
      >
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
          <div v-if="props.items" class="relative grid bg-gray-700 p-2">
            <div
                v-for="item in props.items"
                :key="item.model"
                class="flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50 cursor-pointer"
                @click="updateModel(item)"
            >
              <div class="flex items-center">
                <Icon name="arcticons:ai-chat" size="25" class="text-gray-400"></Icon>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-200">
                    {{ item.name }}
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ item.model }}
                  </p>
                </div>
              </div>
              <Icon v-if="model === item" name="ep:success-filled" size="20"
                    class="text-gray-400 justify-self-end"></Icon>
            </div>
          </div>
          <div v-else class="relative grid bg-gray-700 p-2 text-center text-gray-500">No items</div>
        </div>
      </HeadlessPopoverPanel>
    </transition>
  </HeadlessPopover>
</template>


