<script setup lang="ts">
const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const { transitionDefault } = useTailwindConfig();

function onChooseLanguage(value: MouseEvent) {
  emits('click', value);
}
</script>
<template>
  <li
    class="flex cursor-pointer select-none items-center px-4 py-2 text-sm hover:bg-primary-100"
    :class="[transitionDefault]"
    @click="($event) => onChooseLanguage($event)"
  >
    <div class="mr-3 h-3 w-3 flex-shrink-0">
      <slot name="icon"></slot>
    </div>
    <span class="line-clamp-1">
      <slot />
    </span>
  </li>
</template>
