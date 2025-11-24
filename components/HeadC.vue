<template>
  <div class="mb-2 flex flex-wrap items-center justify-between rounded border bg-white p-4">
    <div class="flex items-center space-x-3 w-full overflow-hidden">
      <!-- Logo -->
      <NuxtLink to="/">
        <img src="/images/logo.svg"
             alt="Logo"
             class="h-10 w-10 rounded-full object-cover mr-4" />
      </NuxtLink>
      

      <!-- Dòng chữ chạy ngang toàn màn hình -->
      <div class="relative flex-1 overflow-hidden">
        <div class="flex whitespace-nowrap animate-marquee">
          <p class="text-lg font-semibold text-primary mr-10">
            👋 Chào mừng bạn đến với trang quản lý Blacklist!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
