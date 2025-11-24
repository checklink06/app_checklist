<script setup lang="ts">
interface TypeProps {
  labelName?: string;
  name?: string;
}
const { transitionDefault } = useTailwindConfig();

const props = withDefaults(defineProps<TypeProps>(), {});

const error: {
  [key: string]: any;
} = inject('error', {});

const keyRules: string[] = inject('keyRules', []);
const isRule = computed(() => {
  if (props.name) return keyRules.includes(props.name);
  return false;
});

provide('labelName', props.labelName);
</script>
<template>
  <div class="mb-7">
    <label
      :for="labelName"
      class="mb-2 mr-2 inline-block select-none align-middle text-sm"
    >
      <slot name="label"></slot>
      <span
        class="text-error-500"
        v-if="isRule"
        >*</span
      >
    </label>
    <div class="relative">
      <div
        :class="{
          'rounded ring-1 ring-red-500': typeof name === 'string' && error[name],
          [transitionDefault]: true
        }"
      >
        <slot></slot>
      </div>
      <Transition name="fade">
        <div
          class="absolute left-0 right-0 top-full m-1 line-clamp-1 select-none text-xs text-error-500"
          v-if="typeof name === 'string' && error[name]"
          :title="error[name]"
        >
          {{ typeof name === 'string' && error[name] }}
        </div>
      </Transition>
    </div>
  </div>
</template>
