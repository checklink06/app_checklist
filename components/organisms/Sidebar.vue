<script setup lang="ts">
  import {
    Squares2X2Icon,
    GlobeAltIcon,
    Cog6ToothIcon,
    LinkIcon,
    IdentificationIcon,
    ArrowLeftOnRectangleIcon,
    PaperAirplaneIcon,
    AtSymbolIcon,
    DocumentDuplicateIcon,
    BoltIcon,
    CurrencyDollarIcon,
    MenuIcon,
    QuestionMarkCircleIcon,
    ChatBubbleBottomCenterTextIcon,
    DocumentTextIcon,
    InformationCircleIcon 
  } from '@heroicons/vue/24/outline';

  interface TypeProps {
    expand?: boolean;
  }

  const props = withDefaults(defineProps<TypeProps>(), {
    expand: false
  });

  const { transitionAll } = useTailwindConfig();
  const { logoutUser } = useLogoutUser();
  const router = useRouter();
  const localePath = useLocalePath();
  const i18n = useI18n();
  const { errorToast, successToast } = useNotification();

  const menuClasses = computed(() => (props.expand ? 'w-52' : 'w-18'));

  async function onClickLogout() {
    await logoutUser();
    router.push('/login');
  }

 

</script>
<template>
  <aside class="my-sidebar-class">
    <div class="fixed bottom-0 left-0 top-0 z-50 overflow-y-auto overflow-x-visible border-r bg-white">
      <div class="h-full"
           :class="[menuClasses, transitionAll]">
        <div class="flex h-full flex-col">
          <NuxtLink :to="localePath('/')">
            <div class="mx-1 my-4 flex h-14 w-auto items-center px-4 py-3 text-primary-300">
              <AtomLogoBrand v-if="expand"></AtomLogoBrand>
              <AtomLogoBrandShort v-else></AtomLogoBrandShort>
            </div>
          </NuxtLink>
          <div class="my-3 border-t"></div>
          <div class="mx-1">
            <MoleculesSidebarMenu :isExpand="expand">
              <NuxtLink :to="localePath('/')">
                <AtomSidebarMenuItem :isExpand="expand">
                  <template #icon>
                    <CurrencyDollarIcon></CurrencyDollarIcon>
                  </template>
                  <template #title>
                    Thông tin tiền tệ
                  </template>
                </AtomSidebarMenuItem>
              </NuxtLink>
              
            </MoleculesSidebarMenu>
          </div>
          <div class="mt-auto">
            <MoleculesSidebarFooter :isExpand="expand"
                                    @click="onClickLogout">
              <AtomSidebarMenuItemFull :isExpand="expand">
                <template #icon>
                  <ArrowLeftOnRectangleIcon></ArrowLeftOnRectangleIcon>
                </template>
                <template #title>
                  {{ $t('dashboard.logout') }}
                </template>
              </AtomSidebarMenuItemFull>
            </MoleculesSidebarFooter>
          </div>
        </div>
      </div>
    </div>
    
  </aside>
</template>
