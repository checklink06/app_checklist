<script setup lang="ts">
interface TypeProps {
  gutter?: number | [number, number];
  align?: 'start' | 'center' | 'end' | 'between' | 'evenly' | 'around' | 'stretch' | 'normal';
}

const props = withDefaults(defineProps<TypeProps>(), {
  align: 'normal'
});

provide('gutter', props.gutter);

const rowStyles = computed(() => {
  if (Array.isArray(props.gutter))
    return {
      marginRight: -0.5 * props.gutter[0] + 'px',
      marginLeft: -0.5 * props.gutter[0] + 'px',
      marginTop: -1 * props.gutter[1] + 'px'
    };
  if (typeof props.gutter === 'number')
    return {
      marginRight: -0.5 * props.gutter + 'px',
      marginLeft: -0.5 * props.gutter + 'px'
    };
});

// 'justify-start' | 'justify-center' | 'justify-end' | 'justify-between' | 'justify-evenly' | 'justify-around' | 'justify-stretch' | 'justify-normal';
const rowClasses = computed(() => {
  const classes = [];
  if (props.align) {
    classes.push(`justify-${props.align}`);
  }
  return classes;
});
</script>
<template>
  <div
    class="flex flex-wrap"
    :class="rowClasses"
    :style="rowStyles"
  >
    <slot />
  </div>
</template>
