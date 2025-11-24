<script setup lang="ts">
interface TypeProps {
  value?: any;
  type?: 'text' | 'password';
  placeholder?: any;
  name?: any;
  labelName?: any;
  size?: 'small' | 'default' | 'large';
  autocomplete?: string;
  autofocus?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {});
const emits = defineEmits<{
  (e: 'click', value: string | number): void;
  (e: 'change', value: string | number): void;
  (e: 'update:value', value: string | number): void;
}>();

const labelNameField = inject('labelName', undefined);
const { transitionDefault } = useTailwindConfig();
const inputRef = ref<HTMLInputElement | null>(null);

function onClick() {
  emits('click', (inputRef.value as HTMLInputElement).value);
}

function onChange() {
  emits('change', (inputRef.value as HTMLInputElement).value);
  emits('update:value', (inputRef.value as HTMLInputElement).value);
}
</script>
<template>
  <div
    class="relative flex items-center rounded border focus-within:ring-1 focus-within:ring-primary-300"
    :class="transitionDefault"
  >
    <div
      class="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-600"
      v-if="$slots['first-icon']"
    >
      <div class="h-3 w-9 px-3">
        <slot name="first-icon"></slot>
      </div>
    </div>
    <input
      :type="type"
      class="w-full rounded bg-white py-2 text-sm outline-none placeholder:text-neutral-400"
      :class="{
        'pl-11': $slots['first-icon'],
        'pr-11': $slots['last-icon'],
        'pl-3': !$slots['first-icon'],
        'pr-3': !$slots['last-icon'],
        uppercase: uppercase
      }"
      ref="inputRef"
      :id="labelNameField ?? labelName"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :autofocus="autofocus"
      @click="onClick"
      @input="onChange"
    />
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600"
      v-if="$slots['last-icon']"
    >
      <div class="h-3 w-9 px-3">
        <slot name="last-icon"></slot>
      </div>
    </div>
  </div>
</template>
