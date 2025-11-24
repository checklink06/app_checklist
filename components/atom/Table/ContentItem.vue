<script setup lang="ts">
interface TypeProps {
  colspan?: number;
  rowspan?: number;
}

const props = defineProps<TypeProps>();
</script>
<template>
  <td
    class="p-4"
    :colspan="colspan"
    :rowspan="rowspan"
  >
    <slot />
  </td>
</template>
