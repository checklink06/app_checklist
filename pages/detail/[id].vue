<script setup lang="ts">
  import {
    PencilIcon,
    PlusIcon,
    TrashIcon,
    LinkIcon,
    AtSymbolIcon,
    DocumentDuplicateIcon,
    EyeIcon,
    PlusCircleIcon,
    CalendarIcon,
    MagnifyingGlassIcon,
    PhoneIcon 
  } from '@heroicons/vue/24/outline';
  import dayjs from 'dayjs';
  import Swal from 'sweetalert2';
  import { debug } from 'util';
  const i18n = useI18n();
  const { brandName, authHost } = useRuntimeConfig().public;
  const isLoading = ref(false);
  // Meta
  definePageMeta({
    layout: 'dashboard-layout'
  });
  const route = useRoute();
  const params = ref<string>(route.params.id as string);

  // Composable
  const { errorToast, successToast } = useNotification();
  const localePath = useLocalePath();
  var searchForm = {}
  var loading = false;
  // FSearch
  const columns = [
    {
      title: "STT",
      dataIndex: 'stt',
      key: 'stt',
      width: '80px'
    },
    {
      title: "Domain",
      dataIndex: 'Text',
      key: 'Text'
    },
    {
      title: "Nhà mạng",
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: "Trạng thái",
      dataIndex: 'status',
      key: 'status'
    }
  ];

  const dataOptionsSearrch = [
    {
      label: "Tất cả trạng thái",
      value: ""
    },
    {
      label: "Đang hoạt động",
      value: "1"
    },
    {
      label: "Đã bị chặn",
      value: "2"
    },
    {
      label: "Được bảo vệ",
      value: "3"
    }
  ]

  const dataOptions = [
    {
      label: "Đang hoạt động",
      value: "1"
    },
    {
      label: "Đã bị chặn",
      value: "2"
    },
    {
      label: "Được bảo vệ",
      value: "3"
    }
  ]
  var chooseValue = "";

  var keyword = "";
  var page = 1;
  var size = 50;
  const { data: domainLists, refresh: refreshSearch, pending: searchLoading, error: searchError } =
    await useAsyncData('get-domain', () =>
      $fetch(authHost + 'api/links?q=' + encodeURIComponent(keyword) + "&skip=" + (page - 1) + "&limit=" + size + "&fileId=" + params.value + "&ispStatus=" + chooseValue)
    );
  if (searchError.value) {
    if (searchError.value.message !== i18n.t('error.notLogin')) {
      showError(searchError.value);
    }
  }

  const { data: fileList } =
    await useAsyncData('get-file', () =>
      $fetch(authHost + 'api/files/get?skip=0&size=1000')
    );

  const { data: contract } =
    await useAsyncData('get-contract', () =>
      $fetch(authHost + 'api/site-contact')
    );

  async function onSearchLinks() {
    page = 1;
    await refreshSearch();
  }

  async function onChangeTablePage(value: { page: number; size: number }) {
    page = value.page;
    size = value.size;
    await refreshSearch();
    const { ispList, rows } = pivotISP(domainLists.value.items);
  }

  function pivotISP(items) {
    const ispSet = new Set<string>();

    // Lấy toàn bộ danh sách ISP
    items.forEach((item) => {
      item.ISP?.forEach((isp) => {
        ispSet.add(isp.name);
      });
    });
    const ispList = Array.from(ispSet);

    // Ghép pivot rows
    const rows = items.map((item) => {
      const row: any = {
        Text: item.Text,
        CreatedAt: item.CreatedAt,
      };

      ispList.forEach((ispName) => {
        const isp = item.ISP.find((x) => x.name === ispName);
        row[ispName] = isp?.status ?? null;
      });

      return row;
    });

    return { ispList, rows };
  }

  const ispList = ref<string[]>([]);
  const pivotRows = ref<any[]>([]);

  watch(
    () => domainLists.value?.items,
    (items) => {
      if (!items) return;

      const { ispList: isps, rows } = pivotISP(items);

      ispList.value = isps;
      pivotRows.value = rows;
    },
    { immediate: true } // 👈 chạy ngay sau lần render đầu
  );

  const dynamicColumns = computed(() => {
    return [
      {
        title: "STT",
        dataIndex: 'stt',
        key: 'stt',
        width: '80px'
      },
      { title: "Domain", dataIndex: "Text", key: "Text", fixed: "left", width: 200 },
      ...ispList.value.map((isp) => ({
        title: isp,
        dataIndex: isp,
        key: isp,
        width: 300
      })),
      {
        title: i18n.t('dashboard.action'),
        dataIndex: 'action',
        key: 'action',
        width: '162px'
      }
    ];
  });

  const searchKeyword = ref("");

  function onGoogleSearch() {
    keyword = searchKeyword.value;
    onSearchLinks();
  }

  function formatDate(value: string) {
    return dayjs(value).format("DD-MM-YYYY");
  }

  async function onSearchDomain(domain) {
    isLoading.value = true
    const { data: dataSearch, error: errorSearch } = await useAsyncData(() =>
      $fetch(authHost + 'api/links/check?url=' + domain));
    var data = [];
    if (dataSearch.value) {
      data.push(dataSearch.value)
      const { ispList, rows } = pivotISP(data);
      pivotRows.value = rows;
      domainLists.value.total = 1
    }
    isLoading.value = false
  }


</script>
<template>
  <LoadingOverlay :visible="isLoading" />
  <main class="p-2">
    <HeadC />
    <section class="mb-4">
      <AtomBoxContainer class="flex-1">
        <DomainSuggest @search="onSearchDomain" />


        <carousel :items="fileList?.list" />

        <!-- LINK TO FULL FILE LIST -->
        <div class="w-full flex justify-center mt-6 mb-4">
          <NuxtLink :to="localePath('list')"
                    class="group flex items-center gap-2 px-5 py-3 rounded-xl
           bg-gradient-to-r from-blue-500 to-indigo-600
           text-white font-semibold shadow-lg hover:shadow-xl
           transition-all duration-300 hover:from-blue-600 hover:to-indigo-700">
            <span>Xem toàn bộ danh sách file tải lên</span>

            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <AtomBoxContainerHeader>Danh sách domain</AtomBoxContainerHeader>
        <div>
          <div class="mb-4">
            <AtomRow :gutter="[16, 32]"
                     align="between"
                     class="flex flex-wrap md:flex-nowrap md:items-center">
              <AtomCol :span="{ span: 12, lg: 12 }"
                       class="w-full md:w-1/2">
                <OrganismsForm v-model="searchForm"
                               @submit="onSearchLinks">
                  <AtomRow :gutter="[16, 16]"
                           class="flex flex-wrap md:flex-nowrap gap-2">
                    <!-- Ô nhập từ khóa -->
                    <AtomCol class="w-full md:flex-1">
                      <AtomInput v-model:value="keyword"
                                 name="text"
                                 autocomplete="off"
                                 placeholder="Nhập tên file cần tìm kiếm"
                                 :autofocus="true">
                      </AtomInput>
                    </AtomCol>

                    <!-- Ô chọn trạng thái -->
                    <AtomCol class="w-full md:w-auto">
                      <MoleculesSelect :options="dataOptionsSearrch"
                                       v-model:value="chooseValue"
                                       placeholder="Chọn trạng thái"
                                       @change="refreshSearch">
                      </MoleculesSelect>
                    </AtomCol>

                    <!-- Nút tìm kiếm -->
                    <AtomCol class="w-full md:w-auto">
                      <AtomButton type="submit"
                                  width="full"
                                  class="w-full md:w-auto">
                        {{ $t('dashboard.search') }}
                      </AtomButton>
                    </AtomCol>
                  </AtomRow>
                </OrganismsForm>
              </AtomCol>
            </AtomRow>

          </div>
          <OrganismsTable :columns="dynamicColumns"
                          :dataSource="pivotRows"
                          :pagination="{
                                            current: page,
                                            pageSizeFake: pivotRows.length,
                                            pageSize: size,
                                            options: [10, 50, 100, 200],
                                            total: domainLists?.total
                                          }"
                          :loading="searchLoading"
                          rowId="id + name"
                          @change="onChangeTablePage"
                          asyncData>
            <template #bodyCell="{ column, text, index, item }">
              <template v-if="column.key === 'stt'">
                <div class="text-center">
                  {{(size ?? 1) * ((page ?? 0) - 1) +index + 1}}
                </div>
              </template>
              <template v-else-if="column.key === 'Text'">
                {{text}}
              </template>
              <template v-else-if="column.key === 'action'" class="items-center">
                <div class="space-x-2 text-center">
                  <NuxtLink :to="contract.telegram" target="_blank">
                    <AtomButton size="small"
                                color="blue"
                                title="Liên hệ">
                      <span class="block h-3 w-3">
                        <PhoneIcon></PhoneIcon>
                      </span>
                    </AtomButton>
                  </NuxtLink>
                </div>
              </template>
              <template v-else class="text-center ">
                <div class="flex justify-center
                            font-bold py-1 rounded
                            whitespace-nowrap
                            overflow-hidden
                            text-ellipsis
                            md:max-w-[500px] max-w-[160px]
                            text-center    "
                     :class="{
                      'bg-green-100 text-green-700': text === 1,
                      'bg-red-100 text-red-700': text === 2,
                      'bg-yellow-100 text-yellow-700': text === 3,
                      'bg-neutral-200 text-neutral-600': text === null
                    }">
                  {{ text === 1 ? "Đang hoạt động" :  text === 2 ? "Đã bị chặn" : text === 3 ? "Được bảo vệ" : "Chưa quét"}}
                </div>
              </template>

            </template>
            <template #summary="{ totalPages }">
              <span class="font-bold">{{ $t('dashboard.total') }}</span>: {{ totalPages }} domain
            </template>
          </OrganismsTable>
          <div class="mt-6 mb-4 flex justify-end">
            <NuxtLink class="font-bold flex items-center gap-2 cursor-pointer px-4 py-2  border-blue-700 text-blue-500 hover:bg-blue-50 transition-colors" :to="localePath('list')">
              <PlusCircleIcon class="w-5 h-5" />
              <span>Xem thêm</span>
            </NuxtLink>
          </div>




        </div>
      </AtomBoxContainer>
    </section>
  </main>
</template>
