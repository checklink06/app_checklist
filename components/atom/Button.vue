<script setup lang="ts">
interface TypeProps {
  size?: 'small' | 'default' | 'large';
  type?: 'button' | 'submit' | 'reset';
  outline?: boolean;
  ghost?: boolean;
  width?: 'full' | 'fit';
  color?: 'primary' | 'yellow' | 'red' | 'blue' | 'gray'| 'green';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {
  size: 'default',
  outline: false,
  ghost: false,
  width: 'fit',
  color: 'primary',
  disabled: false,
  loading: false
});

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const { transitionDefault } = useTailwindConfig();

const buttonClasses = computed(() => {
  const classes = [transitionDefault];
  if (props.color === 'primary') {
    if (props.outline)
      classes.push(
        'text-primary-500 bg-white border-primary-400 hover:bg-neutral-100 hover:text-primary-600 active:text-primary-700 disabled:text-primary-500 disabled:bg-white disabled:opacity-60'
      );
    else if (props.ghost)
      classes.push(
        'text-primary-500 bg-white border-transparent hover:bg-neutral-100 hover:text-primary-600 active:text-primary-700 disabled:text-primary-500 disabled:bg-white disabled:opacity-60'
      );
    else
      classes.push(
        'text-white bg-primary-400 border-primary-400 hover:bg-primary-500 active:bg-primary-600 disabled:bg-primary-400 disabled:text-white disabled:opacity-60'
      );
  }

  if (props.color === 'blue') {
    if (props.outline)
      classes.push(
        'text-info-500 bg-white border-info-400 hover:bg-neutral-100 hover:text-info-600 active:text-info-700 disabled:text-info-500 disabled:bg-white disabled:opacity-60'
      );
    else if (props.ghost)
      classes.push(
        'text-info-500 bg-white border-transparent hover:bg-neutral-100 hover:text-info-600 active:text-info-700 disabled:text-info-500 disabled:bg-white disabled:opacity-60'
      );
    else
      classes.push(
        'text-white bg-info-400 border-info-400 hover:bg-info-500 active:bg-info-600 disabled:bg-info-400 disabled:text-white disabled:opacity-60'
      );
  }

  if (props.color === 'red') {
    if (props.outline)
      classes.push(
        'text-error-500 bg-white border-error-400 hover:bg-neutral-100 hover:text-error-600 active:text-error-700 disabled:text-error-500 disabled:bg-white disabled:opacity-60'
      );
    else if (props.ghost)
      classes.push(
        'text-error-500 bg-white border-transparent hover:bg-neutral-100 hover:text-error-600 active:text-error-700 disabled:text-error-500 disabled:bg-white disabled:opacity-60'
      );
    else
      classes.push(
        'text-white bg-error-400 border-error-400 hover:bg-error-500 active:bg-error-600 disabled:bg-info-400 disabled:text-white disabled:opacity-60'
      );
  }

  if (props.color === 'yellow') {
    if (props.outline)
      classes.push(
        'text-warning-500 bg-white border-warning-400 hover:bg-neutral-100 hover:text-warning-600 active:text-warning-700 disabled:text-warning-500 disabled:bg-white disabled:opacity-60'
      );
    else if (props.ghost)
      classes.push(
        'text-warning-500 bg-white border-transparent hover:bg-neutral-100 hover:text-warning-600 active:text-warning-700 disabled:text-warning-500 disabled:bg-white disabled:opacity-60'
      );
    else
      classes.push(
        'text-white bg-warning-400 border-warning-400 hover:bg-warning-500 active:bg-warning-600 disabled:bg-info-400 disabled:text-white disabled:opacity-60'
      );
  }

  if (props.color === 'gray') {
    if (props.outline)
      classes.push(
        'text-gray-500 bg-white border-neutral-400 hover:bg-neutral-100 hover:text-gray-600 active:text-gray-700 disabled:text-gray-500 disabled:bg-white disabled:opacity-60'
      );
    else if (props.ghost)
      classes.push(
        'text-gray-500 bg-white border-transparent hover:bg-neutral-100 hover:text-gray-600 active:text-gray-700 disabled:text-gray-500 disabled:bg-white disabled:opacity-60'
      );
    else
      classes.push(
        'text-white bg-neutral-400 border-neutral-400 hover:bg-neutral-500 active:bg-neutral-600 disabled:bg-info-400 disabled:text-white disabled:opacity-60'
      );
  }

  if (props.color === 'green') {
    if (props.outline)
      classes.push(
        'text-green-500 bg-white border-green-400 hover:bg-green-100 hover:text-green-600 active:text-green-700 disabled:text-green-500 disabled:bg-white disabled:opacity-60'
      );
    else if (props.ghost)
      classes.push(
        'text-green-500 bg-white border-transparent hover:bg-green-100 hover:text-green-600 active:text-green-700 disabled:text-green-500 disabled:bg-white disabled:opacity-60'
      );
    else
      classes.push(
        'text-white bg-green-400 border-green-400 hover:bg-green-500 active:bg-green-600 disabled:bg-info-400 disabled:text-white disabled:opacity-60'
      );
  }

  if (props.width === 'fit') classes.push('w-fit');
  else if (props.width === 'full') classes.push('w-full');

  if (props.size === 'default') classes.push('text-sm px-4 py-2');
  else if (props.size === 'small') classes.push('text-xs px-3 py-2');
  else if (props.size === 'large') classes.push('text-base px-4 py-3');

  return classes;
});

const iconClasses = computed(() => {
  const classes = [];
  if (props.size === 'default') classes.push('w-3 h-3 mr-1');
  else if (props.size === 'small') classes.push('w-4 h-4 mr-2');
  else if (props.size === 'large') classes.push('w-5 h-5 mr-3');
  return classes;
});

function onClickButton(event: MouseEvent) {
  emits('click', event);
}
</script>
<template>
  <button
    class="rounded border text-center outline-none disabled:cursor-not-allowed"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="onClickButton"
  >
    <div
      class="flex items-center justify-center"
      v-if="loading"
    >
      <div :class="iconClasses">
        <AtomLoading></AtomLoading>
      </div>
      <span>
        <slot name="loading">Loading</slot>
      </span>
    </div>
    <slot v-else></slot>
  </button>
</template>
