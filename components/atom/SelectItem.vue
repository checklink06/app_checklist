<script setup lang="ts">
interface TypeProps {
  value?: any;
  active?: boolean;
  size?: 'small' | 'default' | 'large';
}

const props = withDefaults(defineProps<TypeProps>(), {
  size: 'default'
});
const emits = defineEmits<{
  (e: 'click', value: any): void;
}>();

const { transitionDefaultF } = useTailwindConfig();

const itemClasses = computed(() => {
  const classes = [transitionDefaultF];
  if (props.active) classes.push('bg-primary-200');
  if (props.size === 'default') classes.push('px-4 py-2 text-sm');
  else if (props.size === 'small') classes.push('px-2 py-2 text-xs');
  else if (props.size === 'large') classes.push('px-5 py-3 text-large');

  return classes;
});
function onClickSelectItem(value: any) {
  emits('click', value);
}
</script>
<template>
  <div
    @click="onClickSelectItem(value)"
    class="cursor-pointer hover:bg-neutral-100"
    :class="itemClasses"
  >
    <div class="line-clamp-1">
      <slot />
    </div>
  </div>
</template>
