<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

interface Option {
  label: any;
  value: any;
}

interface TypeProps {
  options?: Option[];
  value?: any;
  placeholder?: any;
  name?: any;
  labelName?: any;
  size?: 'small' | 'default' | 'large';
}

// Props
const props = withDefaults(defineProps<TypeProps>(), {
  options: () => [],
  size: 'default'
});
// Emits
const emits = defineEmits<{
  (e: 'update:value', value: any): void;
  (e: 'change', value: any): void;
}>();
// Inject
const labelNameField = inject('labelName', undefined);
// Data
const { transitionAll } = useTailwindConfig();
const isShow = ref<boolean>(false);
const selectedValue = ref<any>(props.value ?? null);
// Ref
const selectRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
// Computed
const arrowClasses = computed(() =>
  isShow.value ? ['-rotate-180', transitionAll] : [transitionAll]
);
const inputSizeClasses = computed(() => {
  if (props.size === 'default') {
    return 'py-2 pl-4 pr-10 text-sm';
  } else if (props.size === 'small') {
    return 'py-2 pl-2 pr-7 text-xs';
  } else if (props.size === 'large') {
    return 'py-3 pl-5 pr-12 text-large';
  }
});
const arrowSizeClasses = computed(() => {
  if (props.size === 'default') {
    return 'w-4 h-4';
  } else if (props.size === 'small') {
    return 'w-3 h-3';
  } else if (props.size === 'large') {
    return 'w-5 h-5';
  }
});
const selectedOption = computed(() => {
  return props.options.find((item) => item.value === selectedValue.value);
});
// Watch
watch(
  () => props.value,
  (newValue) => {
    selectedValue.value = newValue;
  }
);
// Methods
function onToggleSelect() {
  isShow.value = !isShow.value;
  if (isShow.value) {
    inputRef.value?.focus();
  }
}

function onClickItem(item: Option) {
  selectedValue.value = item.value;
  emits('update:value', selectedValue.value);
  emits('change', selectedValue.value);
}

const onClickOutside = (event: MouseEvent) => {
  if (!selectRef.value?.contains(event?.target as Node)) {
    isShow.value = false;
  }
};
// Mounted
onMounted(() => {
  document.addEventListener('click', onClickOutside);
});
// Unmounted
onUnmounted(() => {
  document.addEventListener('click', onClickOutside);
});
</script>
<template>
  <div>
    <div
      @click="onToggleSelect"
      ref="selectRef"
      class="relative  select-none"
    >
      <div class="cursor-pointer">
        <input
          :value="selectedOption?.label"
          :name="name"
          :placeholder="placeholder"
          :id="labelNameField ?? labelName"
          ref="inputRef"
          class="pointer-events-none w-full rounded border outline-none focus-within:ring-1 focus-within:ring-primary-300"
          :class="inputSizeClasses"
          readonly
        />
        <div class="absolute right-4 top-1/2 -translate-y-1/2">
          <div :class="[arrowClasses, arrowSizeClasses]">
            <ChevronDownIcon></ChevronDownIcon>
          </div>
        </div>
      </div>
      <Transition name="fade">
        <div
          class="absolute left-0 right-0 top-full z-20 py-1"
          v-show="isShow"
        >
          <ul
            class="my-select-dropdown max-h-44 w-full overflow-y-auto rounded border bg-white pb-1 pt-2 text-sm shadow-sm"
          >
            <li
              v-for="option of options"
              :key="JSON.stringify(option)"
              @click="() => onClickItem(option)"
            >
              <AtomSelectItem
                :active="selectedOption?.value === option.value"
                :size="size"
                >{{ option.label }}</AtomSelectItem
              >
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>
