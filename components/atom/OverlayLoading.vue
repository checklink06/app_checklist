<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-[110] flex items-center justify-center bg-neutral-300 bg-opacity-60"
  >
    <div class="mx-auto w-full max-w-2xl px-12">
      <div class="mb-2 h-10 w-full rounded bg-gray-100">
        <div class="h-10 animate-fillWidth rounded bg-primary-300"></div>
      </div>
      <div class="flex justify-between text-black">
        <span class="font-bold">
          <slot> Loading... </slot>
        </span>
        <span class="font-bold uppercase"></span>
      </div>
    </div>
  </div>
</template>
