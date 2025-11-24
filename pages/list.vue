<script setup lang="ts">
  import {
    PencilIcon,
    PlusIcon,
    TrashIcon,
    LinkIcon,
    AtSymbolIcon,
    DocumentDuplicateIcon,
    EyeIcon
  } from '@heroicons/vue/24/outline';
  import dayjs from 'dayjs';
  import Swal from 'sweetalert2';
  const i18n = useI18n();
  const { brandName, authHost } = useRuntimeConfig().public;
  const { formatDateVN } = useFormat();

  // Meta
  definePageMeta({
    layout: 'dashboard-layout'
  });

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
      title: "File Name",
      dataIndex: 'displayName',
      key: 'displayName'
    },
    //{
    //  title: "Trạng thái",
    //  dataIndex: 'status',
    //  key: 'status'
    //},
    {
      title: "Ngày tạo",
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: '200px'
    },
    {
      title: i18n.t('dashboard.action'),
      dataIndex: 'action',
      key: 'action',
      width: '162px'
    }
  ];

  const dataOptionsSearrch = [
    {
      label: "Tất cả trạng thái",
      value: ""
    },
    {
      label: "Đã quét",
      value: "1"
    },
    {
      label: "Chưa quét",
      value: "2"
    }
  ]

  var chooseValue = "";
  var keyword = "";
  var page = 1;
  var size = 10;
  const { data: fileData, refresh: refreshSearch, pending: searchLoading, error: searchError } =
    await useAsyncData('get-file', () =>
      $fetch(authHost + 'api/files/get?q=' + keyword + "&skip=" + (page - 1) + "&size=" + size)
    );
  if (searchError.value) {
    if (searchError.value.message !== i18n.t('error.notLogin')) {
      showError(searchError.value);
    }
  }
  async function onSearchLinks() {
    page = 1;
    await refreshSearch();
  }

  async function onChangeTablePage(value: { page: number; size: number }) {
    page = value.page;
    size = value.size;
    await refreshSearch();
  }

</script>
<template>
  <main class="p-2">
    <HeadC/>
    <section class="mb-4">
      <AtomBoxContainer class="flex-1">
        <AtomBoxContainerHeader>Danh sách file</AtomBoxContainerHeader>
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
          <OrganismsTable :columns="columns"
                          :dataSource="fileData.list"
                          :pagination="{
              current: page,
              pageSize: size,
              options: [10, 25, 50],
              total: fileData?.total
            }"
                          :loading="searchLoading"
                          rowId="id"
                          @change="onChangeTablePage"
                          asyncData>
            <template #bodyCell="{ column, text, index, item }">
              <template v-if="column.key === 'stt'">
                <div class="text-center">
                  {{(size ?? 1) * ((page ?? 0) - 1) +index + 1}}
                </div>
              </template>
              <template v-if="column.key === 'uploadedAt'">
                <div class="text-center">
                  {{ formatDateVN(text) }}
                </div>
              </template>
              <template v-if="column.key === 'status'" class="text-center">
                <AtomTag color="gray"
                         v-if="text == '1'">
                  <span class="whitespace-nowrap">Chưa quét</span>
                </AtomTag>
                <AtomTag color="blue"
                         v-else-if="text == '2'">
                  <span class="whitespace-nowrap">Đã quét</span>
                </AtomTag>
              </template>
              <template v-if="column.key === 'action'" class="items-center">
                <div class="space-x-2 text-center">
                  <NuxtLink :to="localePath({ name: `detail-id`, params: { id: item.id } })">
                    <AtomButton size="small"
                                color="green"
                                :title="$t('dashboard.detailApiInfo')">
                      <span class="block h-3 w-3">
                        <EyeIcon></EyeIcon>
                      </span>
                    </AtomButton>
                  </NuxtLink>
                </div>
              </template>
            </template>
            <template #summary="{ totalPages }">
              <span class="font-bold">{{ $t('dashboard.total') }}</span>: {{ totalPages }} file
            </template>
          </OrganismsTable>
        </div>
      </AtomBoxContainer>
    </section>
   
  </main>
</template>
