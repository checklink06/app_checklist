<script setup lang="ts">
import { useUiStore } from '@/store/ui';
const uiStore = useUiStore();

function onClick() {
  uiStore.toggleExpandMenu();
}
</script>
<template>
  <div class="border-b bg-white">
    <div class="flex flex-wrap items-center justify-center">
      <!--<div class="flex-shrink-0">
        <AtomToggleMenu @click="onClick"></AtomToggleMenu>
      </div>-->
      <div class="ml-auto flex items-center">
        <slot name="headerRight"></slot>
      </div>
    </div>
  </div>
</template>
