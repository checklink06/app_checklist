<script setup lang="ts">
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid';
</script>
<template>
  <div class="mb-2 flex items-center">
    <div class="mx-2 h-3 w-3">
      <ChevronDoubleRightIcon></ChevronDoubleRightIcon>
    </div>
    <h3 class="text-base">
      <slot />
    </h3>
  </div>
</template>
