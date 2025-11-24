<script setup lang="ts">
interface TypeProps {
  actived?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<TypeProps>(), {
  actived: false
});

const { transitionDefault } = useTailwindConfig();
const paginationItemClasses = computed(() =>
  props.actived
    ? [transitionDefault, 'border-primary-500 text-primary-500']
    : ['border-transparent  text-neutral-900 hover:text-neutral-700 hover:bg-neutral-100']
);
</script>
<template>
  <div>
    <div
      class="flex h-8 min-w-[32px] cursor-pointer items-center justify-center rounded border bg-white px-2 leading-tight"
      :class="paginationItemClasses"
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
