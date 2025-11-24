<script setup>
  import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

  const props = defineProps({
    items: { type: Array, default: () => [] }
  });

  // =============================
  // CONFIG
  // =============================
  const gap = 24;
  const autoplayDelay = 2600;

  // =============================
  // STATE
  // =============================
  const current = ref(0);
  const container = ref(null);
  const itemWidth = ref(0);

  let autoplayTimer = null;

  // =============================
  // CLONE ITEMS ĐỂ LOOP VÔ TẬN
  // =============================
  const cloned = ref([]);

  function buildClones() {
    cloned.value = [
      ...props.items,
      ...props.items,
      ...props.items,
    ];

    current.value = props.items.length; // bắt đầu ở giữa
  }

  // =============================
  // LẤY KÍCH THƯỚC
  // =============================
  async function recalc() {
    await nextTick();

    const el = container.value;
    if (!el) return;

    const first = el.querySelector(".carousel-item");
    if (!first) return;

    itemWidth.value = first.offsetWidth;

    scrollToCurrent(false); // không animate initial
  }

  // =============================
  // SCROLL ĐẾN ITEM
  // =============================
  function scrollToCurrent(animate = true) {
    const el = container.value;
    if (!el) return;

    const x = current.value * (itemWidth.value + gap);

    el.style.transition = animate ? "transform 0.45s ease" : "none";
    el.style.transform = `translateX(calc(${x * -1}px + 50vw - ${itemWidth.value / 2}px))`;
  }

  // =============================
  // AUTOPLAY
  // =============================
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => next(), autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // =============================
  // NEXT + PREV (loop vô tận thật)
  // =============================
  function next() {
    current.value++;

    scrollToCurrent(true);

    // Nếu đi quá clone thứ 2 → nhảy về clone giữa
    if (current.value >= props.items.length * 2) {
      setTimeout(() => {
        current.value = props.items.length; // giữa
        scrollToCurrent(false);
      }, 460);
    }
  }

  function prev() {
    current.value--;

    scrollToCurrent(true);

    // Nếu về trước clone thứ 1 → nhảy về giữa
    if (current.value < props.items.length) {
      setTimeout(() => {
        current.value = props.items.length * 2 - 1;
        scrollToCurrent(false);
      }, 460);
    }
  }

  // =============================
  // DOTS (chỉ hiển thị số lượng thật)
  // =============================
  function goTo(index) {
    current.value = props.items.length + index;
    scrollToCurrent(true);
    startAutoplay();
  }

  // =============================
  // WATCH DATA
  // =============================
  watch(
    () => props.items,
    async () => {
      buildClones();
      await recalc();
      startAutoplay();
    },
    { immediate: true }
  );

  onMounted(() => {
    buildClones();
    recalc();
    startAutoplay();
    window.addEventListener("resize", recalc);
  });

  onUnmounted(() => {
    stopAutoplay();
    window.removeEventListener("resize", recalc);
  });
</script>

<template>
  <div class="relative w-full overflow-hidden py-8">

    <!-- ARROW LEFT -->
    <button class="absolute left-2 top-1/2 -translate-y-1/2 z-20
                   bg-white/90 hover:bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
            @click="prev">
      <svg class="h-6 w-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- LIST -->
    <div ref="container" class="flex transition-all duration-300 select-none">
      <div v-for="(item, i) in cloned" :key="i"
           class="carousel-item w-[240px] md:w-[280px] lg:w-[320px] mx-3 bg-white rounded-xl shadow-xl border border-neutral-200 p-5
                  transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl cursor-pointer">

        <div class="text-lg font-semibold text-blue-600 truncate">
          {{ item.displayName }}
        </div>

        <div class="mt-2 flex items-center text-neutral-600 text-sm">
          <svg class="w-5 h-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ item.uploadedAt.substring(0, 10).split("-").reverse().join("-") }}
        </div>

        <div class="mt-3 text-neutral-600">
          Domain:
          <span class="font-bold text-indigo-600">{{ item.linkCount }}</span>
        </div>

        <!-- ⭐ Nút xem chi tiết -->
        <NuxtLink :to="`/detail/${item.id}`">
          <div class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-semibold hover:bg-blue-700">
            Xem chi tiết →
          </div>
        </NuxtLink>

      </div>
    </div>

    <!-- ARROW RIGHT -->
    <button class="absolute right-2 top-1/2 -translate-y-1/2 z-20
                   bg-white/90 hover:bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
            @click="next">
      <svg class="h-6 w-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- DOTS -->
    <div class="flex justify-center mt-5 space-x-2">
      <div v-for="(item, i) in props.items" :key="i"
           class="w-3 h-3 rounded-full cursor-pointer transition-all"
           :class="((current - props.items.length) % props.items.length) === i
                    ? 'bg-blue-600 scale-125'
                    : 'bg-neutral-300 hover:bg-neutral-400'"
           @click="goTo(i)" />
    </div>

  </div>
</template>

<style scoped>
  .carousel-item {
    flex-shrink: 0;
  }
</style>
