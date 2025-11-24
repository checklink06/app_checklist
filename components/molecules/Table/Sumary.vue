<script setup lang="ts">
interface Option {
  label: any;
  value: any;
}

interface TypeProps {
  totalPages?: number;
  currentPage?: number;
  visiblePages?: number;
  pageSize?: number;
  options?: number[];
  text?: string;
  isPageSize?: boolean;
}

const props = withDefaults(defineProps<TypeProps>(), {
  totalPages: 1,
  currentPage: 1,
  visiblePages: 5,
  pageSize: 10,
  options: () => [10, 25, 50],
  text: 'page',
  isPageSize: true
});

const emits = defineEmits<{
  (e: 'change', value: { current: number; pageSize: number; total: number }): void;
}>();

const tableOptions = ref<Option[]>();

watch(
  () => props.options,
  (newValue) => {
    tableOptions.value = newValue.map((value) => ({
      value: value,
      label: props.text ? value + ' ' + props.text : value
    }));
  },
  { immediate: true }
);

function onChangePageSize(value: any) {
  emits('change', {
    current: props.currentPage,
    total: props.totalPages,
    pageSize: value
  });
}

function onChangePerPage(value: any) {
  emits('change', {
    current: value?.current,
    total: value?.total,
    pageSize: props.pageSize
  });
}
</script>
<template>
  <div class="flex flex-wrap items-center justify-start px-4">
    <div class="">
      <slot>
        Show <span class="font-bold">{{ currentPage }}</span> of
        <span class="font-bold">{{ totalPages }}</span> pages
      </slot>
    </div>
    <div class="ml-auto flex flex-wrap items-center justify-end space-x-8">
      <MoleculesPagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        :visiblePages="visiblePages"
        @change="onChangePerPage"
      ></MoleculesPagination>
      <MoleculesSelect
        v-if="isPageSize"
        size="small"
        class="w-28"
        :options="tableOptions"
        :value="pageSize"
        @change="onChangePageSize"
      >
      </MoleculesSelect>
    </div>
  </div>
</template>
