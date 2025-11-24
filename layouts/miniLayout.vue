<script setup lang="ts">
import { localeOptions } from '@/constants/options';
const { locale } = useI18n();
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
    <div class="flex flex-1 flex-col">
      <slot />
    </div>
    <OrganismsMainFooter></OrganismsMainFooter>
  </div>
</template>
