<script setup lang="ts">
interface TypeProps {
  span?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | {
        span?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      };
}

const props = withDefaults(defineProps<TypeProps>(), {});

const gutter = inject('gutter', undefined);

const colStyle = computed(() => {
  let styles = {};
  if (gutter) {
    if (Array.isArray(gutter))
      styles = {
        paddingRight: 0.5 * gutter[0] + 'px',
        paddingLeft: 0.5 * gutter[0] + 'px',
        paddingTop: gutter[1] + 'px'
      };
    if (typeof gutter === 'number')
      styles = {
        paddingRight: 0.5 * gutter + 'px',
        paddingLeft: 0.5 * gutter + 'px'
      };
  }
  return styles;
});

// 'w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12 w-10/12 w-11/12 w-full'
// 'md:w-1/12 md:w-2/12 md:w-3/12 md:w-4/12 md:w-5/12 md:w-6/12 md:w-7/12 md:w-8/12 md:w-9/12 md:w-10/12 md:w-11/12 md:w-full'
// 'lg:w-1/12 lg:w-2/12 lg:w-3/12 lg:w-4/12 lg:w-5/12 lg:w-6/12 lg:w-7/12 lg:w-8/12 lg:w-9/12 lg:w-10/12 lg:w-11/12 lg:w-full'
// 'xl:w-1/12 xl:w-2/12 xl:w-3/12 xl:w-4/12 xl:w-5/12 xl:w-6/12 xl:w-7/12 xl:w-8/12 xl:w-9/12 xl:w-10/12 xl:w-11/12 xl:w-full'
// '2xl:w-1/12 2xl:w-2/12 2xl:w-3/12 2xl:w-4/12 2xl:w-5/12 2xl:w-6/12 2xl:w-7/12 2xl:w-8/12 2xl:w-9/12 2xl:w-10/12 2xl:w-11/12 2xl:w-full'
const colClasses = computed(() => {
  let classes = [];
  if (
    Number.isInteger(props.span) &&
    typeof props.span === 'number' &&
    props.span >= 1 &&
    props.span <= 12
  ) {
    classes.push(`w-${props.span}/12`);
  } else if (typeof props.span === 'object') {
    if (
      Number.isInteger(props.span['span']) &&
      typeof props.span['span'] === 'number' &&
      props.span['span'] >= 1 &&
      props.span['span'] <= 12
    ) {
      if (props.span['span'] === 12) classes.push('w-full');
      else classes.push(`w-${props.span['span']}/12`);
    }
    if (
      Number.isInteger(props.span['sm']) &&
      typeof props.span['sm'] === 'number' &&
      props.span['sm'] >= 1 &&
      props.span['sm'] <= 12
    ) {
      if (props.span['sm'] === 12) classes.push('sm:w-full');
      classes.push(`sm:w-${props.span['sm']}/12`);
    }
    if (
      Number.isInteger(props.span['md']) &&
      typeof props.span['md'] === 'number' &&
      props.span['md'] >= 1 &&
      props.span['md'] <= 12
    ) {
      if (props.span['md'] === 12) classes.push('md:w-full');
      else classes.push(`md:w-${props.span['md']}/12`);
    }
    if (
      Number.isInteger(props.span['lg']) &&
      typeof props.span['lg'] === 'number' &&
      props.span['lg'] >= 1 &&
      props.span['lg'] <= 12
    ) {
      if (props.span['lg'] === 12) classes.push('lg:w-full');
      else classes.push(`lg:w-${props.span['lg']}/12`);
    }
    if (
      Number.isInteger(props.span['xl']) &&
      typeof props.span['xl'] === 'number' &&
      props.span['xl'] >= 1 &&
      props.span['xl'] <= 12
    ) {
      if (props.span['xl'] === 12) classes.push('xl:w-full');
      else classes.push(`xl:w-${props.span['xl']}/12`);
    }
    if (
      Number.isInteger(props.span['xxl']) &&
      typeof props.span['xxl'] === 'number' &&
      props.span['xxl'] >= 1 &&
      props.span['xxl'] <= 12
    ) {
      if (props.span['xxl'] === 12) classes.push('2xl:w-full');
      else classes.push(`2xl:w-${props.span['xxl']}/12`);
    }
    return classes;
  }
});
</script>
<template>
  <div
    :style="colStyle"
    :class="colClasses"
  >
    <slot />
  </div>
</template>
