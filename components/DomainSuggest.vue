<script setup lang="ts">
  import { ref, computed } from "vue";
  import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

  const emit = defineEmits(["search"]);

  // text hiển thị trong input
  const inputValue = ref("");
  // text dùng để tính suggestions (chỉ đổi khi người dùng gõ)
  const typedValue = ref("");
  // giá trị submit
  const keyword = ref("");

  const activeIndex = ref(-1);
  const showSuggest = ref(false);
  // TLD
  const popularTLD = [
    // ⭐ TLD phổ biến
    "com", "net", "org", "info", "biz", "xyz", "online", "site", "store", "tech", "app",
    "shop", "blog", "io", "me", "dev", "co", "ai", "cloud", "pro", "live", "wiki",

    // ⭐ TLD quốc gia (ccTLD)
    "vn", "us", "uk", "jp", "kr", "ru", "cn", "de", "fr", "it", "in",
    "ca", "au", "sg", "my", "id", "th", "ph", "la", "tv", "io", "cc",

    // ⭐ New gTLD
    "click", "loan", "press", "space", "top", "club", "fun", "vip", "fit",
    "run", "today", "world", "global", "finance", "digital", "solutions",
    "agency", "media", "tv", "games", "movie", "casino", "online",

    // ⭐ SL-Domain (CentralNIC)
    "co.vn", "com.vn", "net.vn", "biz.vn", "edu.vn",
    "uk.com", "uk.net", "eu.com", "us.com", "jpn.com", "br.com",
    "za.com", "ru.com", "cn.com", "in.net", "in.us", "in.ua",
    "gb.net", "gb.com", "ae.org", "gr.com", "hu.net",
    "se.net", "se.com", "sa.com", "kr.com", "no.com",
    "qc.com", "uy.com", "ar.com", "cl.com", "mx.com",

    // ⭐ Một số TLD khác
    "bet", "game", "games", "shop", "movie", "music", "design", "studio",
    "travel", "restaurant", "coffee", "camera", "host", "hosting",
    "social", "chat", "community", "network"
  ];

  const otherTLD: string[] = [];

  const suggestions = computed(() => {
    const text = typedValue.value.trim();
    if (!text) return [];

    const clean = text.replace(/\..*$/, "");

    const allDomains = [
      ...popularTLD.map(t => `${clean}.${t}`),
      ...otherTLD.map(t => `${clean}.${t}`)
    ];

    const scored = allDomains.map(d => ({
      domain: d,
      score: scoreMatch(text, d)
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 6).map(x => x.domain);
  });

  function scoreMatch(input: string, domain: string): number {
    input = input.toLowerCase();
    domain = domain.toLowerCase();

    if (domain.startsWith(input)) return 100;
    if (domain.includes(input)) return 70;

    let diff = Math.abs(domain.length - input.length);
    return 50 - diff;
  }

  // Khi người dùng GÕ (not arrow)
  function onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    inputValue.value = value;
    typedValue.value = value;    // chỉ gõ mới đổi typedValue
    activeIndex.value = -1;      // reset vị trí chọn
    showSuggest.value = !!value; // nếu có text thì mở gợi ý
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!showSuggest.value || suggestions.value.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex.value = (activeIndex.value + 1) % suggestions.value.length;
      // chỉ đổi input hiển thị, không đổi typedValue => list đứng im
      inputValue.value = suggestions.value[activeIndex.value];
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex.value =
        (activeIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
      inputValue.value = suggestions.value[activeIndex.value];
    } else if (e.key === "Enter") {
      e.preventDefault();
      keyword.value = inputValue.value.trim();
      if (!keyword.value) return;
      emit("search", keyword.value);
      showSuggest.value = false;
    }
  }

  function onSearchClick() {
    keyword.value = inputValue.value.trim();
    if (!keyword.value) return;
    emit("search", keyword.value);
    showSuggest.value = false;
  }

  function chooseSuggestion(s: string) {
    inputValue.value = s;
    keyword.value = s;
    emit("search", s);
    showSuggest.value = false;
  }


</script>

<template>
  <div class="relative w-full flex justify-center z-[999]">
    <div class="w-full max-w-2xl">

      <!-- SEARCH BOX -->
      <div class="flex items-center gap-3 bg-white rounded-full px-5 py-3.5
               shadow-lg border border-neutral-200 hover:shadow-xl hover:border-blue-300
               transition-all duration-300">

        <!-- ICON SEARCH -->
        <MagnifyingGlassIcon class="w-6 h-6 text-neutral-500 cursor-pointer"
                             @click="onSearchClick" />

        <!-- INPUT -->
        <input :value="inputValue"
               @input="onInput"
               @keydown="onKeyDown"
               @focus="showSuggest = !!typedValue"
               type="text"
               class="flex-1 text-[17px] text-neutral-700 bg-transparent outline-none
                 placeholder-neutral-400"
               placeholder="Tìm nhanh domain..." />

        <!-- BUTTON SEARCH (chỉ desktop) -->
        <button @click="onSearchClick"
                class="hidden md:px-4 md:py-1.5 md:bg-blue-600 md:hover:bg-blue-700
         md:text-white md:font-medium md:rounded-full md:transition
         md:text-base md:whitespace-nowrap">
          Tìm kiếm
        </button>
      </div>

      <!-- SUGGEST LIST -->
      <div v-if="showSuggest && suggestions.length"
           class="absolute mt-1 w-full max-w-2xl bg-white rounded-xl shadow-xl
               border border-neutral-200 overflow-hidden animate-fadeIn z-[9999]">
        <div v-for="(s, i) in suggestions"
             :key="i"
             @click="chooseSuggestion(s)"
             class="px-4 py-3 cursor-pointer text-neutral-700 hover:bg-neutral-100 flex items-center justify-between"
             :class="i === activeIndex ? 'bg-blue-50 text-blue-600' : ''">
          <div class="flex items-center gap-2">
            <MagnifyingGlassIcon class="w-5 h-5 text-neutral-400" />
            {{ s }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>



<style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
