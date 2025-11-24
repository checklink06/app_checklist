<template>
  <div class="mb-2 flex items-center">
    <div
      class="mr-2 h-4 w-4"
      v-if="$slots['icon']"
    >
      <slot name="icon" />
    </div>
    <h2><slot></slot></h2>
  </div>
</template>
