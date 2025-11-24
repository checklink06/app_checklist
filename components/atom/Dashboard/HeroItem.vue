<script setup lang="ts">
interface TypeProps {
  backgroundColorClass: string;
  iconColorClass: string;
}

withDefaults(defineProps<TypeProps>(), {
  backgroundColorClass: 'bg-red-200',
  iconColorClass: 'bg-red-400'
});
</script>
<template>
  <div
    class="rounded-2xl p-5"
    :class="backgroundColorClass"
  >
    <div
      class="mb-4 h-10 w-10 rounded-full p-2 text-white"
      :class="iconColorClass"
    >
      <slot name="icon"></slot>
    </div>
    <div class="mb-2 text-2xl font-bold">
      <slot name="value"></slot>
    </div>
    <div class="text-base">
      <slot name="text"></slot>
    </div>
  </div>
</template>
