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
    class="cursor-pointer select-none px-4 py-2 text-sm hover:bg-primary-100"
    :class="[transitionDefault]"
    @click="($event) => onChooseLanguage($event)"
  >
    <span class="line-clamp-1">
      <slot />
    </span>
  </li>
</template>
