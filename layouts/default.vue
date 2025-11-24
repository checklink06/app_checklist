<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { localeOptions } from '@/constants/options';

const { transitionDefault } = useTailwindConfig();
const jwtToken = useCookie('Authorization');
const localePath = useLocalePath();

const isLogin = computed(() => (jwtToken.value ? true : false));

const isOpenMenu = ref<boolean>(false);

function onOpenMenu() {
  isOpenMenu.value = !isOpenMenu.value;
}

function onCloseMenu() {
  isOpenMenu.value = false;
}
const router = useRouter();
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();

function onSwitchLanguage(languageCode: string) {
  router.push({ path: switchLocalePath(languageCode), query: route.query });
}
</script>
<template>
  <div class="flex min-h-screen min-w-[280px] flex-col">
    <OrganismsMainHeader>
      <template #menu>
        <nav class="my-header-main">
          <!--<ul class="flex space-x-1">
            <li>
              <NuxtLink
                :to="localePath('/')"
                class="block py-2"
              >
                <span
                  class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-black"
                >
                  {{ $t('header.home') }}
                </span>
              </NuxtLink>
            </li>
            <template v-if="isLogin">
              <NuxtLink
                class="block py-2"
                :to="localePath('/dashboard')"
                ><span
                  class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-black"
                >
                  {{ $t('header.dashboard') }}
                </span>
              </NuxtLink>
            </template>
            <template v-else>
              <li>
                <NuxtLink
                  class="block py-2"
                  :to="localePath('/login')"
                  ><span
                    class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-black"
                  >
                    {{ $t('header.login') }}
                  </span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="block py-2"
                  :to="localePath('/register')"
                  ><span
                    class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-black"
                  >
                    {{ $t('header.register') }}
                  </span>
                </NuxtLink>
              </li>
            </template>
          </ul>-->
        </nav>
      </template>
      <template #toggleMenu>
        <div class="absolute right-0 top-1/2 -translate-y-1/2 sm:hidden">
          <AtomToggleMenu @click="onOpenMenu"></AtomToggleMenu>
        </div>
        <Teleport to="body">
          <Transition name="fade">
            <div
              v-if="isOpenMenu"
              class="relative z-50 sm:hidden"
            >
              <div class="fixed bottom-0 left-0 right-0 top-0 z-50 bg-neutral-900 bg-opacity-90">
                <div class="absolute right-8 top-8">
                  <div
                    class="h-8 w-8 cursor-pointer p-1 text-white hover:text-neutral-200"
                    :class="transitionDefault"
                    @click="onCloseMenu"
                  >
                    <XMarkIcon></XMarkIcon>
                  </div>
                </div>
                <div class="mt-20">
                  <nav class="my-header-main">
                    <!--<ul class="flex flex-col space-x-1">
                      <li>
                        <NuxtLink
                          :to="localePath('/')"
                          class="block cursor-pointer py-2"
                        >
                          <span
                            class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold"
                          >
                            {{ $t('header.home') }}
                          </span>
                        </NuxtLink>
                      </li>
                      <template v-if="!isLogin">
                        <li>
                          <NuxtLink
                            :to="localePath('/login')"
                            class="block cursor-pointer py-2"
                            ><span
                              class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-white"
                            >
                              {{ $t('header.login') }}
                            </span>
                          </NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            :to="localePath('/register')"
                            class="block cursor-pointer py-2"
                            ><span
                              class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-white"
                            >
                              {{ $t('header.register') }}
                            </span>
                          </NuxtLink>
                        </li>
                      </template>
                      <template v-else>
                        <li>
                          <NuxtLink
                            v-if="isLogin"
                            :to="localePath('/dashboard')"
                            class="block cursor-pointer py-2"
                            ><span
                              class="block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-white"
                            >
                              {{ $t('header.dashboard') }}
                            </span>
                          </NuxtLink>
                        </li>
                      </template>
                      <li>
                        <MoleculesDashboardHeaderLanguage
                          :options="localeOptions"
                          :value="locale"
                          @change="(languageCode) => onSwitchLanguage(languageCode)"
                        ></MoleculesDashboardHeaderLanguage>
                      </li>
                    </ul>-->
                  </nav>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </template>
      <template #headerRight>
        <div class="ml-12 hidden md:block">
          <MoleculesDashboardHeaderLanguage
            :options="localeOptions"
            :value="locale"
            @change="(languageCode) => onSwitchLanguage(languageCode)"
          ></MoleculesDashboardHeaderLanguage>
        </div>
      </template>
    </OrganismsMainHeader>
    <div class="flex-1">
      <slot />
    </div>
    <OrganismsMainFooter></OrganismsMainFooter>
  </div>
</template>
