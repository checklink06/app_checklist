<script setup lang="ts">
interface TypeProps {
  color?: 'primary' | 'yellow' | 'red' | 'blue' | 'gray';
}

const props = withDefaults(defineProps<TypeProps>(), {
  color: 'gray'
});

const tagClasses = computed(() => {
  const classes = [];
  if (props.color === 'primary') classes.push('text-primary-500 border-primary-500 bg-primary-50');
  if (props.color === 'yellow') classes.push('text-yellow-500 border-yellow-500 bg-yellow-50');
  if (props.color === 'red') classes.push('text-red-500 border-red-500 bg-red-50');
  if (props.color === 'blue') classes.push('text-blue-500 border-blue-500 bg-blue-50');
  if (props.color === 'gray') classes.push('text-gray-500 border-gray-500 bg-gray-50');
  return classes;
});
</script>
<template>
  <div
    class="inline-block select-none rounded-sm border px-2 py-[0.125rem] align-middle text-xs"
    :class="tagClasses"
  >
    <slot />
  </div>
</template>
