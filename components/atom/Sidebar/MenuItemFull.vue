<script setup lang="ts">
interface TypeProps {
  isExpand?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {
  isExpand: false
});

const { transitionDefault } = useTailwindConfig();
const titleMenuItem = ref<HTMLDivElement | null>(null);

const textTitle = computed(() => titleMenuItem.value?.textContent || '');
</script>

<template>
  <div
    class="flex cursor-pointer select-none items-center justify-center py-3 text-neutral-500 hover:bg-neutral-600 hover:text-white"
    :class="transitionDefault"
    :title="textTitle"
  >
    <div class="my-1 h-4 w-10 px-3">
      <slot name="icon"></slot>
    </div>
    <div
      class="flex-1 overflow-hidden whitespace-nowrap text-sm"
      :class="{ hidden: !isExpand }"
      ref="titleMenuItem"
    >
      <slot name="title"></slot>
    </div>
  </div>
</template>
