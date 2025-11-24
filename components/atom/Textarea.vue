<script setup lang="ts">
interface TypeProps {
  value?: any;
  rows?: number;
  placeholder?: any;
  name?: any;
  labelName?: any;
  size?: 'small' | 'default' | 'large';
  autocomplete?: string;
  autofocus?: boolean;
  resize?: 'x' | 'y' | 'none';
}

const props = withDefaults(defineProps<TypeProps>(), {
  rows: 5
});
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

function onInput() {
  emits('change', (inputRef.value as HTMLInputElement).value);
  emits('update:value', (inputRef.value as HTMLInputElement).value);
}
</script>
<template>
  <div
    class="relative flex items-center rounded-lg border focus-within:ring-1 focus-within:ring-primary-300"
    :class="transitionDefault"
  >
    <textarea
      class="w-full rounded-lg bg-white px-3 py-2 text-sm outline-none"
      :class="{
        'resize-none': resize === 'none',
        'resize-x': resize === 'x',
        'resize-y': resize === 'y'
      }"
      ref="inputRef"
      :rows="rows"
      :id="labelNameField ?? labelName"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      @click="onClick"
      @change="onChange"
      @input="onInput"
    />
  </div>
</template>
