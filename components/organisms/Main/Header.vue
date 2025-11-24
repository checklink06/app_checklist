<script setup lang="ts">
const { transitionDefault } = useTailwindConfig();
const localePath = useLocalePath();

const isTopPage = ref<boolean>(true);

function topPage() {
  if (window.scrollY > 0) isTopPage.value = false;
  else isTopPage.value = true;
}

onMounted(() => {
  topPage();
  window.addEventListener('scroll', topPage);
});

onUnmounted(() => {
  window.removeEventListener('scroll', topPage);
});
</script>
<template>
  <div
    class="fixed left-0 right-0 top-0 z-40"
    :class="{ 'bg-white shadow': !isTopPage, [transitionDefault]: true }"
  >
    <div class="container relative mx-auto flex h-[3.25rem] items-center px-4">
      <NuxtLink
        :to="localePath('/')"
        class="mx-auto block sm:mx-0"
      >
        <div class="h-8 w-32 text-primary-500">
          <AtomLogoBrand></AtomLogoBrand>
        </div>
      </NuxtLink>
      <div class="ml-auto hidden sm:block md:mr-auto">
        <div class="flex items-center">
          <slot name="menu" />
        </div>
      </div>
      <div>
        <slot name="headerRight"></slot>
      </div>
      <div>
        <slot name="toggleMenu"></slot>
      </div>
    </div>
  </div>
</template>
