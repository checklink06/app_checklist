<script setup lang="ts">
interface TypeProps {
  isExpand?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {
  isExpand: false
});
</script>
<template>
  <div class="my-menu-class space-y-1">
    <slot></slot>
  </div>
</template>
