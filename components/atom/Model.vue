<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
const { transitionDefault } = useTailwindConfig();

interface TypeProps {
  value?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {
  value: false
});

const emits = defineEmits<{
  (e: 'update:value', value: boolean): void;
}>();

function onCloseModel() {
  emits('update:value', false);
}
</script>
<template>
  <div>
    <div class="relative z-[60]">
      <Transition name="fade">
        <div
          class="no-scrollbar fixed bottom-0 left-0 right-0 top-0 overflow-y-auto bg-neutral-700 bg-opacity-70"
          v-if="value"
        >
          <div
            class="flex min-h-screen items-start justify-center px-4"
            @click.self="onCloseModel"
          >
            <div class="my-16 w-full max-w-5xl rounded-lg bg-white p-4">
              <div class="relative border-b pb-2 pr-9 text-lg font-semibold">
                <span>
                  <slot name="title"> </slot>
                </span>
                <div class="absolute right-0 top-1/2 -translate-y-1/2">
                  <div
                    class="h-9 w-9 cursor-pointer rounded p-2 hover:bg-neutral-200"
                    :class="transitionDefault"
                    @click="onCloseModel"
                  >
                    <XMarkIcon></XMarkIcon>
                  </div>
                </div>
              </div>
              <div class="py-4">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
