<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
const { transitionDefault } = useTailwindConfig();
</script>
<template>
  <div class="flex items-center [&>.my-breadcrumb-seperator-classes]:last:hidden">
    <div
      class="[&>a]:text-black [&>a]:hover:text-blue-700"
      :class="transitionDefault"
    >
      <slot />
    </div>
    <div class="my-breadcrumb-seperator-classes mx-2 h-2 w-2">
      <ChevronRightIcon></ChevronRightIcon>
    </div>
  </div>
</template>
