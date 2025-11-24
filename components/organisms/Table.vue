<script setup lang="ts">
type DataIndex = string | number | symbol;

interface ITableSize {
  page: number;
  size: number;
}

interface IColumn {
  title?: any;
  dataIndex?: DataIndex;
  key?: DataIndex;
  width?: any;
  minWidth?: any;
}

interface IPagination {
  current?: number;
  pageSize?: number;
  options?: number[];
  total?: number;
}

interface TypeProps {
  columns?: IColumn[] | null;
  dataSource?: any[];
  pagination?: IPagination;
  loading?: boolean;
  isPageSize?: boolean;
  asyncData?: boolean;
  rowId?: string | number | symbol;
}

const props = withDefaults(defineProps<TypeProps>(), {
  columns: () => [],
  pagination: () => ({
    current: 1,
    pageSize: 10,
    options: [10, 25, 100, 500]
  }),
  loading: false,
  asyncData: false,
  rowId: 'id',
  isPageSize: true
});

const emits = defineEmits<{
  (e: 'change', { page, size }: ITableSize): void;
}>();

const pageSize = ref<number>(props.pagination.pageSize ?? 10);
const currentPage = ref<number>(props.pagination.current ?? 1);
const totalPages = ref<number>(1);

watch(
  () => props.pagination.current,
  (newValue) => {
    currentPage.value = newValue && newValue > 0 ? newValue : 1;
  }
);

watch(
  () => props.pagination.pageSize,
  (newValue) => {
    pageSize.value = newValue && newValue > 0 ? newValue : 10;
  }
);

watch(totalPages, (newValue) => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

watch(
  () => [props.dataSource, props.pagination.total, pageSize],
  () => {
    // console.log(props.pagination.total, pageSize);
    if (
      typeof props.pagination.total === 'number' &&
      props.pagination.total >= 0 &&
      pageSize.value
    ) {
      totalPages.value = Math.ceil(props.pagination.total / pageSize.value) || 1;
    } else if (
      typeof props.dataSource?.length === 'number' &&
      props.dataSource?.length &&
      props.dataSource?.length >= 0 &&
      pageSize.value
    ) {
      totalPages.value = Math.ceil(props.dataSource?.length / pageSize.value) || 1;
    }
  },
  {
    immediate: true
  }
);

const filteredData = computed(() => {
  if (props.asyncData) {
    return props.dataSource?.filter((item, index) => {
      return index >= 0 && index < pageSize.value * 1;
    });
  } else {
    return props.dataSource?.filter((item, index) => {
      return (
        index >= pageSize.value * (currentPage.value - 1) &&
        index < pageSize.value * currentPage.value
      );
    });
  }
});

function getTextCell(item: { [key: DataIndex]: any }, dataIndex: DataIndex = '') {
  if (item && item[dataIndex] != undefined) return item[dataIndex];
  return '';
}

function onChangeTablePage(value: { current: number; total: number; pageSize: number }) {
  currentPage.value = value?.current;
  pageSize.value = value?.pageSize;
  totalPages.value = value?.total;

  emits('change', { page: currentPage.value, size: pageSize.value });
}
</script>
<template>
  <div class="text-sm">
    <div class="relative mb-4 overflow-x-auto">
      <ClientOnly>
        <div
          class="absolute bottom-0 left-0 right-0 top-0 z-20 bg-neutral-300 bg-opacity-25"
          v-if="loading"
        >
          <div
            class="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-neutral-400"
          >
            <AtomLoading></AtomLoading>
          </div>
        </div>
      </ClientOnly>
      <table class="w-full">
        <colgroup>
          <col
            v-for="column of columns"
            :key="JSON.stringify(column)"
            :style="{ width: column.width, minWidth: column.minWidth }"
          />
        </colgroup>
        <MoleculesTableHeader class="bg-neutral-50">
          <AtomTableRow>
            <AtomTableHeaderItem
              v-for="column of columns"
              :key="column.key"
              :separation="true" class="text-center"
            >
              {{ column.title }}
            </AtomTableHeaderItem>
          </AtomTableRow>
        </MoleculesTableHeader>
        <MoleculesTableBody>
          <AtomTableRow
            v-if="filteredData?.length"
            v-for="(item, index) of filteredData"
            :key="item[rowId]"
          >
            <AtomTableContentItem
              v-for="column of columns"
              :key="column.key"
            >
              <slot
                name="bodyCell"
                :column="column"
                :text="getTextCell(item, column.dataIndex)"
                :index="index"
                :item="item"
              >
                {{ getTextCell(item, column.dataIndex) }}
              </slot>
            </AtomTableContentItem>
          </AtomTableRow>
          <AtomTableRow v-else>
            <AtomTableContentItem :colspan="columns?.length">
              <div class="mx-auto h-11 w-16 space-y-3 py-20">
                <AtomNoData></AtomNoData>
                <div class="select-none text-center text-neutral-300">No Data</div>
              </div>
            </AtomTableContentItem>
          </AtomTableRow>
        </MoleculesTableBody>
        <!-- <MoleculesTableFooter></MoleculesTableFooter> -->
      </table>
    </div>
    <MoleculesTableSumary
      :options="pagination.options"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :pageSize="pageSize"
      :isPageSize="isPageSize"
      @change="(value) => onChangeTablePage(value as any)"
    >
      <slot
        name="summary"
        :totalPages="pagination.total"
        :currentPage="currentPage"
        :pageSize="pageSize"
      >
      </slot>
    </MoleculesTableSumary>
  </div>
</template>
