<script setup lang="ts">
interface TypeProps {
  value?: boolean;
  labelName?: any;
}

// Props
const props = withDefaults(defineProps<TypeProps>(), {});
// Emits
const emits = defineEmits<{
  (e: 'update:value', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

// Inject
const labelNameField = inject('labelName', undefined);

// Template Ref
const inputValue = ref<boolean>(false || props.value);

// Function
function onClickCheckbox() {
  inputValue.value = !inputValue.value;
  emits('update:value', inputValue.value);
  emits('change', inputValue.value);
}

// Watch
watch(
  () => props.value,
  (newValue) => {
    inputValue.value = newValue;
  }
);
</script>
<template>
  <div
    class="flex select-none"
    @click="onClickCheckbox"
  >
    <input
      type="checkbox"
      class="peer hidden"
      v-model="inputValue"
      :id="labelNameField ?? labelName"
    />
    <div
      class="relative h-6 w-12 cursor-pointer overflow-hidden rounded-full border border-gray-200 bg-white shadow-inner transition-all duration-300 hover:bg-gray-100 peer-checked:bg-blue-400 peer-checked:[&>div]:left-6 peer-checked:[&>div]:bg-gray-100"
    >
      <div
        class="absolute left-1 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-400 transition-all duration-300"
      ></div>
    </div>
  </div>
</template>
