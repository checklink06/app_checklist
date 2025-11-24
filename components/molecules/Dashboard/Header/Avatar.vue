<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

interface TypeProps {
  username?: any;
  fullname?: any;
  account?: any;
  isDropdown?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {
  username: 'example@gmail.com',
  fullname: 'Example 1',
  account: 'User',
  isDropdown: true
});

const { transitionAll } = useTailwindConfig();

const isShow = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);
function onToggleDropdown() {
  isShow.value = !isShow.value;
}

function onClickOutside(event: MouseEvent) {
  if (!dropdownRef.value?.contains(event.target as Node)) {
    isShow.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  document.addEventListener('click', onClickOutside);
});
</script>
<template>
  <div
    class="relative select-none"
    ref="dropdownRef"
  >
    <div
      class="flex cursor-pointer items-center rounded-lg px-2 hover:bg-neutral-50"
      @click="onToggleDropdown"
    >
      <div class="mr-2">
        <AtomDashboardHeaderAvatar :text="username"></AtomDashboardHeaderAvatar>
      </div>
      <div class="mr-2 w-14">
        <div
          class="line-clamp-1 text-xs font-semibold"
          :title="fullname"
        >
          {{ fullname }}
        </div>
        <div class="line-clamp-1 text-xs font-light">{{ account }}</div>
      </div>
      <div
        class="h-4 w-4"
        :class="{
          '-rotate-180': isShow,
          [transitionAll]: true
        }"
        v-if="isDropdown"
      >
        <ChevronDownIcon></ChevronDownIcon>
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="isDropdown"
        v-show="isShow"
        class="absolute right-0 top-full z-40 pt-1"
      >
        <div class="w-full min-w-[180px] max-w-[200px] rounded-md border bg-white py-2">
          <div class="mb-3 mt-1 line-clamp-1 w-full px-4 text-sm">
            <span>@ </span>
            <span class="text-xs">{{ username }}</span>
          </div>
          <ul>
            <slot name="dropdown"></slot>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>
