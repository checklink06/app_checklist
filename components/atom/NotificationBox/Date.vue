<script setup lang="ts">
import { ClockIcon } from '@heroicons/vue/24/outline';
</script>
<template>
  <div class="flex items-center">
    <div class="mr-1 h-4 w-4">
      <ClockIcon></ClockIcon>
    </div>
    <span class="text-xs text-neutral-600">
      <slot />
    </span>
  </div>
</template>
