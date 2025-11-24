<script setup lang="ts">
interface TypeProps {
  disabled?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<TypeProps>(), {
  disabled: false
});

const { transitionAll } = useTailwindConfig();

const disableClasses = computed(() =>
  props.disabled
    ? ['text-neutral-300 cursor-not-allowed', transitionAll]
    : ['text-neutral-900 cursor-pointer hover:bg-neutral-100', transitionAll]
);
</script>
<template>
  <div>
    <div
      class="flex h-8 min-w-[32px] items-center justify-center bg-white px-2 leading-tight"
      :class="disableClasses"
      :title="title"
    >
      <div
        class="h-4 w-4"
        v-if="$slots.icon"
      >
        <slot name="icon" />
      </div>
      <slot />
    </div>
  </div>
</template>
