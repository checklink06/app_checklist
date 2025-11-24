<script setup lang="ts">
interface TypeProps {
  separation?: boolean;
  colspan?: number;
  rowspan?: number;
}

const props = withDefaults(defineProps<TypeProps>(), {
  separation: false
});
</script>
<template>
  <th
    v-if="separation"
    class="relative bg-slate-100 p-4 text-left before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[0.125rem] before:-translate-y-1/2 before:bg-neutral-300 before:content-[''] first:before:hidden"
    :colspan="colspan"
    :rowspan="rowspan"
  >
    <slot />
  </th>
  <th
    class="p-4 text-left"
    v-else
  >
    <slot />
  </th>
</template>
