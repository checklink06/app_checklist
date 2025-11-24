<script setup lang="ts">
import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline';

interface TypeProps {
  id: any;
  type: 'default' | 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}

const props = withDefaults(defineProps<TypeProps>(), {
  type: 'default'
});

const emits = defineEmits(['close']);

function onClose() {
  emits('close', props.id);
}
</script>
<template>
  <div class="pointer-events-auto relative mb-4 w-fit max-w-full">
    <div
      class="flex items-center rounded-lg border border-l-4 border-gray-100 bg-white px-6 py-5 shadow-lg"
      :class="{
        ' border-l-success-500': type === 'success',
        ' border-l-info-500': type === 'info',
        ' border-l-warning-500': type === 'warning',
        ' border-l-error-500': type === 'error'
      }"
    >
      <div
        class="mr-3"
        :class="{
          'text-success-500': type === 'success',
          'text-info-500': type === 'info',
          'text-warning-500': type === 'warning',
          'text-error-500': type === 'error'
        }"
      >
        <div
          class="h-8 w-8"
          v-if="type === 'success'"
        >
          <CheckCircleIcon></CheckCircleIcon>
        </div>
        <div
          class="h-8 w-8"
          v-if="type === 'info'"
        >
          <InformationCircleIcon></InformationCircleIcon>
        </div>
        <div
          class="h-8 w-8"
          v-if="type === 'warning'"
        >
          <ExclamationCircleIcon></ExclamationCircleIcon>
        </div>
        <div
          class="h-8 w-8"
          v-if="type === 'error'"
        >
          <XMarkIcon></XMarkIcon>
        </div>
      </div>
      <div class="w-96">
        <div class="font-semibold">{{ title }}</div>
        <div class="line-clamp-3 text-sm text-gray-800">
          {{ description }}
        </div>
      </div>
    </div>
    <div
      class="absolute right-5 top-5 flex -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center p-2"
      @click="onClose"
    >
      <div class="h-4 w-4">
        <XMarkIcon></XMarkIcon>
      </div>
    </div>
  </div>
</template>
