<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline';

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

function onClick(event: MouseEvent) {
  emits('click', event);
}

const { transitionDefault } = useTailwindConfig();
</script>
<template>
  <button
    class="hover: h-12 w-12 cursor-pointer px-2 py-2 align-middle outline-none hover:bg-neutral-300"
    :class="transitionDefault"
    @click="onClick"
  >
    <Bars3Icon></Bars3Icon>
  </button>
</template>
