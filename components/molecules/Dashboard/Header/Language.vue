<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

interface Option {
  value: any;
  label: any;
}

interface TypeProps {
  options?: Option[] | null;
  value?: any;
}
// Props
const props = withDefaults(defineProps<TypeProps>(), {
  options: () => [] as Option[],
  value: ''
});
// Emits
const emits = defineEmits<{
  (e: 'update:value', value: any): void;
  (e: 'change', value: any): void;
}>();
// Data
const { transitionAll } = useTailwindConfig();
const isShow = ref<boolean>(false);
// Ref
const languageRef = ref<HTMLDivElement | null>(null);
// Computed
const activeElement = computed(() => {
  return props.options?.find((item) => props.value === item.value);
});

const arrowClasses = computed(() =>
  isShow.value ? ['-rotate-180', transitionAll] : [transitionAll]
);
// Method
function onToggleLanguage() {
  isShow.value = !isShow.value;
}
const onClickOutside = (event: MouseEvent) => {
  if (!languageRef.value?.contains(event?.target as Node)) {
    isShow.value = false;
  }
};
function onClickLanguageItem(item: Option) {
  isShow.value = false;
  emits('update:value', item.value);
  emits('change', item.value);
}
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
  <div
    class="relative rounded-md border"
    ref="languageRef"
  >
    <div
      class="relative cursor-pointer select-none rounded-md bg-white hover:bg-neutral-50 active:bg-neutral-100"
      @click="onToggleLanguage"
    >
      <input
        type="text"
        class="pointer-events-none w-20 bg-transparent py-2 pl-4 pr-9 text-sm uppercase outline-none"
        :value="activeElement?.value"
        readonly
      />
      <span
        class="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 align-middle"
        :class="arrowClasses"
      >
        <ChevronDownIcon></ChevronDownIcon>
      </span>
    </div>
    <Transition name="slide-fade">
      <div
        class="absolute right-0 top-full z-40 min-w-full pt-1"
        v-show="isShow"
      >
        <ul class="w-full min-w-[100px] rounded-md border bg-white py-2">
          <AtomDashboardHeaderLanguageItem
            v-for="option of options"
            :key="JSON.stringify(option)"
            @click="() => onClickLanguageItem(option)"
          >
            {{ option.label }}
          </AtomDashboardHeaderLanguageItem>
        </ul>
      </div>
    </Transition>
  </div>
</template>
