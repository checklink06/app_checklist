<script setup lang="ts">
const localePath = useLocalePath();
</script>
<template>
  <div>
    <!--<MoleculesMainFooterTop>
      <AtomRow :gutter="[16, 16]">
        <AtomCol
          :span="{ span: 12, md: 4 }"
          class="self-center"
        >
          <div class="mb-6 h-10 w-40">
            <AtomLogoBrand></AtomLogoBrand>
          </div>
          <div class="text-base text-neutral-100">
            {{ $t('footer.slogan') }}
          </div>
        </AtomCol>
        <AtomCol :span="{ span: 12, md: 8 }">
          <AtomRow
            :gutter="16"
            align="evenly"
          >
            <AtomCol>
              <div>
                <div class="mb-4 text-xl font-semibold">Pages</div>
                <ul class="space-y-2 text-sm">
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.about') }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :to="localePath('/login')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.login') }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.help') }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.contact') }}</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </AtomCol>
            <AtomCol>
              <div>
                <div class="mb-4 text-xl font-semibold">{{ $t('footer.service') }}</div>
                <ul class="space-y-2 text-sm">
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.contentWriting') }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.seo') }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.adv') }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :to="localePath('/')"
                      class="text-white hover:text-neutral-100"
                      >{{ $t('footer.job') }}</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </AtomCol>
          </AtomRow>
        </AtomCol>
      </AtomRow>
    </MoleculesMainFooterTop>
    <MoleculesMainFooterBottom>
      <AtomRow
        :gutter="16"
        align="end"
      >
        <AtomCol
          ><NuxtLink
            :to="localePath('/disclaimer')"
            class="text-sm text-white underline underline-offset-2 hover:text-neutral-100"
            >{{ $t('footer.disclaimer') }}</NuxtLink
          ></AtomCol
        >
        <AtomCol
          ><NuxtLink
            :to="localePath('/')"
            class="text-sm text-white underline underline-offset-2 hover:text-neutral-100"
            >{{ $t('footer.rules') }}</NuxtLink
          ></AtomCol
        >
        <AtomCol
          ><NuxtLink
            :to="localePath('/term')"
            class="text-sm text-white underline underline-offset-2 hover:text-neutral-100"
            >{{ $t('footer.term') }}</NuxtLink
          ></AtomCol
        >
      </AtomRow>
    </MoleculesMainFooterBottom>-->
  </div>
</template>
