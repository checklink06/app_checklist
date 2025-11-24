<script setup lang="ts">
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/20/solid';

interface TypeProps {
  totalPages?: number;
  currentPage?: number;
  visiblePages?: number;
}

const { transitionDefault } = useTailwindConfig();

const props = withDefaults(defineProps<TypeProps>(), {
  totalPages: 1,
  currentPage: 1,
  visiblePages: 5
});

const emits = defineEmits<{
  (e: 'change', value: { current: number; total: number }): void;
}>();

const totalPagination = ref<number>(props.totalPages);
const currentPagination = ref<number>(props.currentPage);
const visiblePagination = ref<number>(props.visiblePages);

const paginationArray = computed(() => {
  return generatePagination(
    currentPagination.value,
    totalPagination.value,
    visiblePagination.value
  );
});

watch(
  () => props.currentPage,
  (newValue) => {
    currentPagination.value = newValue;
  }
);

watch(
  () => props.totalPages,
  (newValue) => {
    totalPagination.value = newValue;
  }
);

watch(currentPagination, (newValue) => {
  currentPagination.value = newValue;
  emits('change', { current: currentPagination.value, total: totalPagination.value });
});

function generatePagination(
  currentPage: number,
  totalPages: number,
  visiblePages: number = 5
): (number | string)[] {
  if (currentPage < 1 || totalPages < 1 || currentPage > totalPages) return [1];

  const halfVisible = Math.floor(visiblePages / 2);
  let startPage = Math.max(currentPage - halfVisible, 1);
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const pagination = [];

  for (let page = startPage; page <= endPage; ++page) {
    pagination.push(page);
  }

  if (startPage > 1) {
    if (startPage > 2) {
      pagination.unshift('...');
    }
    pagination.unshift(1);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pagination.push('...');
    }
    pagination.push(totalPages);
  }
  return pagination;
}

function nextPage() {
  if (currentPagination.value < totalPagination.value) {
    currentPagination.value += 1;
  }
}

function prevPage() {
  if (currentPagination.value > 1) {
    currentPagination.value -= 1;
  }
}

function choosePage(value: number) {
  if (value >= 1 && value <= totalPagination.value && value != currentPagination.value) {
    currentPagination.value = value;
  }
}

function skipNextPage() {
  currentPagination.value = Math.min(currentPagination.value + 5, totalPagination.value);
}

function skipPrevPage() {
  currentPagination.value = Math.max(currentPagination.value - 5, 1);
}
</script>
<template>
  <nav aria-label="Page navigation">
    <ul class="inline-flex select-none flex-wrap text-sm">
      <li
        @click="prevPage"
        class="overflow-hidden rounded-l-md"
      >
        <AtomPaginationStep
          :disabled="currentPagination === 1"
          title="Prev"
        >
          <template #icon>
            <ChevronLeftIcon></ChevronLeftIcon>
          </template>
        </AtomPaginationStep>
      </li>
      <template
        v-for="(item, index) of paginationArray"
        :key="item"
      >
        <li
          v-if="index === 1 && typeof item === 'string' && item === '...'"
          title="Prev 5 page"
          @click="skipPrevPage"
        >
          <AtomPaginationItem class="group/skip relative">
            <span
              class="group-hover/skip:opacity-0"
              :class="transitionDefault"
            >
              {{ item }}</span
            >
            <div
              class="absolute bottom-0 left-0 right-0 top-0 p-2 opacity-0 group-hover/skip:opacity-60"
              :class="transitionDefault"
            >
              <ChevronDoubleLeftIcon></ChevronDoubleLeftIcon>
            </div>
          </AtomPaginationItem>
        </li>
        <li
          v-else-if="
            index === paginationArray.length - 2 && typeof item === 'string' && item === '...'
          "
          title="Next 5 page"
          @click="skipNextPage"
        >
          <AtomPaginationItem class="group/skip relative">
            <span
              class="group-hover/skip:opacity-0"
              :class="transitionDefault"
              >{{ item }}</span
            >
            <div
              class="absolute bottom-0 left-0 right-0 top-0 p-2 opacity-0 group-hover/skip:opacity-60"
              :class="transitionDefault"
            >
              <ChevronDoubleRightIcon></ChevronDoubleRightIcon>
            </div>
          </AtomPaginationItem>
        </li>
        <li
          v-else-if="typeof item === 'number'"
          :title="item.toString()"
          @click="() => choosePage(item)"
        >
          <AtomPaginationItem :actived="item === currentPagination">
            {{ item }}
          </AtomPaginationItem>
        </li>
      </template>
      <li
        class="overflow-hidden rounded-r-md"
        @click="nextPage"
      >
        <AtomPaginationStep
          :disabled="currentPagination === totalPagination"
          title="Next"
        >
          <template #icon>
            <ChevronRightIcon></ChevronRightIcon>
          </template>
        </AtomPaginationStep>
      </li>
    </ul>
  </nav>
</template>
