<script setup lang="ts">
import { localeOptions } from '@/constants/options';
const { locale } = useI18n();

defineProps({
  error: Object
});

onMounted(() => {
  window.scrollTo({
    top: 0
  });
});

const handleError = () => clearError({ redirect: '/' });
</script>
<template>
  <div class="flex min-h-screen min-w-[280px] flex-col">
    <OrganismsMainHeader>
      <template #headerRight>
        <div class="ml-12 hidden md:block">
          <MoleculesDashboardHeaderLanguage
            :options="localeOptions"
            v-model:value="locale"
          ></MoleculesDashboardHeaderLanguage>
        </div>
      </template>
    </OrganismsMainHeader>
    <div class="flex-1">
      <div
        class="bg-cover px-4 pt-[3.25rem] md:px-16"
        style="background-image: url('/images/bg-testimonials-large.webp')"
      >
        <img
          src="/images/404.webp"
          alt="error image"
          class="mx-auto block w-1/2"
        />
        <div class="pb-32">
          <p
            class="lg:text3xl text-center text-xl font-bold text-neutral-500 md:text-2xl xl:text-4xl"
          >
            {{ error?.message }}
          </p>
        </div>
      </div>
    </div>
    <OrganismsMainFooter></OrganismsMainFooter>
  </div>
</template>
