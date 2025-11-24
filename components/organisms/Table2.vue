<script setup lang="ts">
  import { ref, watch, computed } from 'vue'

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
    pageSizeFake?: number;
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
    mergeKeys?: string[]; // 👈 các cột cần merge
  }

  const props = withDefaults(defineProps<TypeProps>(), {
    columns: () => [],
    pagination: () => ({
      current: 1,
      pageSize: 10,
      options: [10, 25, 100]
    }),
    loading: false,
    asyncData: false,
    rowId: 'id',
    isPageSize: true,
    mergeKeys: () => []
  });

  const emits = defineEmits<{
    (e: 'change', { page, size }: ITableSize): void;
  }>();

  const pageSize = ref<number>(props.pagination.pageSize ?? 10);
  const pageSizeFake = ref<number>(props.pagination.pageSizeFake ?? 10);
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

  watch(totalPages, () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  });

  watch(
    () => [props.dataSource, props.pagination.total, pageSize.value],
    () => {
      if (
        typeof props.pagination.total === 'number' &&
        props.pagination.total >= 0 &&
        pageSize.value
      ) {
        totalPages.value = Math.ceil(props.pagination.total / pageSize.value) || 1;
      } else if (
        typeof props.dataSource?.length === 'number' &&
        props.dataSource?.length >= 0 &&
        pageSize.value
      ) {
        totalPages.value = Math.ceil(props.dataSource.length / pageSize.value) || 1;
      }
    },
    { immediate: true }
  );

  const filteredData = computed(() => {
    // Khi asyncData = true => dữ liệu đã phân trang, không slice nữa
    if (props.asyncData) {
      return props.dataSource || [];
    }

    // Khi tự phân trang local
    return props.dataSource?.slice(
      (currentPage.value - 1) * pageSizeFake.value,
      currentPage.value * pageSizeFake.value
    ) || [];
  });

  function getTextCell(item: Record<DataIndex, any>, dataIndex: DataIndex = '') {
    return item?.[dataIndex] ?? '';
  }

  function onChangeTablePage(value: { current: number; total: number; pageSize: number }) {
    currentPage.value = value.current;
    pageSize.value = value.pageSize;
    totalPages.value = value.total;

    emits('change', { page: currentPage.value, size: pageSize.value });
  }

  // ----------------------------------------
  // 👇 Logic merge hàng không liên tiếp
  // ----------------------------------------
  interface MergedRow {
    item: any;
    rowspanMap: Record<string, number>;
    isFirstMap: Record<string, boolean>;
  }

  const mergedData = computed<MergedRow[]>(() => {
    const data = filteredData.value || [];
    const mergeKeys = props.mergeKeys || [];

    if (!mergeKeys.length) {
      // Không merge gì
      return data.map((item) => ({
        item,
        rowspanMap: {},
        isFirstMap: {}
      }));
    }

    const result: MergedRow[] = data.map((item) => ({
      item,
      rowspanMap: {},
      isFirstMap: {}
    }));

    mergeKeys.forEach((key) => {
      const groupMap = new Map<any, number[]>(); // lưu vị trí dòng cùng giá trị

      // Gom nhóm
      data.forEach((row, index) => {
        const value = row[key];
        if (!groupMap.has(value)) groupMap.set(value, []);
        groupMap.get(value)!.push(index);
      });

      // Gán rowspan & cờ isFirst
      groupMap.forEach((indexes) => {
        const firstIndex = indexes[0];
        const rowspan = indexes.length;

        result[firstIndex].rowspanMap[key] = rowspan;
        indexes.forEach((i, idx) => {
          result[i].isFirstMap[key] = idx === 0;
        });
      });
    });

    return result;
  });
</script>

<template>
  <div class="text-sm">
    <div class="relative mb-4 overflow-x-auto">
      <ClientOnly>
        <div class="absolute inset-0 z-20 bg-neutral-300 bg-opacity-25"
             v-if="loading">
          <div class="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-neutral-400">
            <AtomLoading />
          </div>
        </div>
      </ClientOnly>
      <table class="w-full border-collapse">
        <colgroup>
          <col v-for="column of columns"
               :key="JSON.stringify(column)"
               :style="{ width: column.width, minWidth: column.minWidth }" />
        </colgroup>

        <MoleculesTableHeader class="bg-neutral-50">
          <AtomTableRow>
            <AtomTableHeaderItem v-for="column of columns"
                                 :key="column.key"
                                 :separation="true">
              {{ column.title }}
            </AtomTableHeaderItem>
          </AtomTableRow>
        </MoleculesTableHeader>

        <MoleculesTableBody>
          <AtomTableRow v-if="mergedData?.length"
                        v-for="(row, index) of mergedData"
                        :key="`${row.item[rowId]}-${index}`">
            <AtomTableContentItem v-for="column of columns"
                                  :key="column.key"
                                  v-show="!mergeKeys.includes(String(column.dataIndex)) || row.isFirstMap[String(column.dataIndex)]"
                                  :rowspan="mergeKeys.includes(String(column.dataIndex)) ? (row.rowspanMap[String(column.dataIndex)] || 1) : 1">

              <slot name="bodyCell"
                    :column="column"
                    :text="getTextCell(row.item, column.dataIndex)"
                    :index="index"
                    :item="row.item">
                {{ getTextCell(row.item, column.dataIndex) }}
              </slot>
            </AtomTableContentItem>
          </AtomTableRow>

          <AtomTableRow v-else>
            <AtomTableContentItem :colspan="columns?.length">
              <div class="mx-auto h-11 w-16 space-y-3 py-20">
                <AtomNoData />
                <div class="select-none text-center text-neutral-300">No Data</div>
              </div>
            </AtomTableContentItem>
          </AtomTableRow>
        </MoleculesTableBody>
      </table>
    </div>

    <MoleculesTableSumary :options="pagination.options"
                          :currentPage="currentPage"
                          :totalPages="totalPages"
                          :pageSize="pageSize"
                          :isPageSize="isPageSize"
                          @change="(value) => onChangeTablePage(value as any)">
      <slot name="summary"
            :totalPages="pagination.total"
            :currentPage="currentPage"
            :pageSize="pageSize" />
    </MoleculesTableSumary>
  </div>
</template>
