<script setup>
const props = defineProps({
  visible: { type: Boolean, default: false }
});
</script>

<template>
  <transition name="fade">
    <div v-if="visible"
         class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99999]
             flex items-center justify-center select-none">

      <div class="flex flex-col items-center gap-4">
        <!-- Loader -->
        <div class="w-14 h-14 border-4 border-white/40 border-t-white
                    rounded-full animate-spin"></div>

        <!-- Text -->
        <p class="text-white font-semibold text-lg tracking-wide">
          Đang xử lý...
        </p>
      </div>

    </div>
  </transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .25s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
