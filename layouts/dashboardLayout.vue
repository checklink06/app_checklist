<script setup lang="ts">
import { UserIcon, ArrowLeftOnRectangleIcon, LanguageIcon } from '@heroicons/vue/24/outline';
import { localeOptions } from '@/constants/options';
import { useUiStore } from '@/store/ui';
import { useUserStore } from '@/store/user';

const uiStore = useUiStore();
const userStore = useUserStore();
const localePath = useLocalePath();
const { brandName } = useRuntimeConfig().public;
const { transitionAll } = useTailwindConfig();

const isExpandMenu = computed<boolean>(() => uiStore.isExpandMenu);
const contentClass = computed<string[]>(() =>
  uiStore.isExpandMenu ? ['ml-52', transitionAll] : ['ml-18', transitionAll]
);

const userName = computed(() => userStore.user?.userName);
const fullName = computed(() => userStore.user?.fullName);


 const { data: contract } =
 await useAsyncData('get-contract', () =>
   $fetch(authHost + 'api/site-contact' )
 );

const { logoutUser } = useLogoutUser();
const router = useRouter();
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();

function onSwitchLanguage(languageCode: string) {
  router.push({ path: switchLocalePath(languageCode), query: route.query });
}

function onClickSwitchLanguage() {
  let activeLanguageIndex = localeOptions.findIndex((item) => item.value === locale.value);
  if (localeOptions.length) {
    let nextLanguageIndex =
      activeLanguageIndex === localeOptions.length - 1 ? 0 : activeLanguageIndex + 1;
    router.push({
      path: switchLocalePath(localeOptions[nextLanguageIndex].value),
      query: route.query
    });
  }
}

async function onClickLogout() {
  await logoutUser();
  router.push(localePath('/login'));
}
</script>
<template>
  <div class="min-h-screen min-w-[280px] bg-neutral-50">
    <div class="flex min-h-screen flex-col">
      <OrganismsDashboardHeader>
      </OrganismsDashboardHeader>
      <div class="flex-1">
        <slot />
      </div>
    <OrganismsDashboardFooter> Mọi thắc mắc xin liên hệ  <NuxtLink :to="contract?.telegram" target="_blank">@Blacklist</NuxtLink> </OrganismsDashboardFooter>
    </div>
  </div>
</template>
