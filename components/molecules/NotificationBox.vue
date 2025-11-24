<template>
  <div>
    <div class="mt-2 flex items-center justify-between">
      <AtomNotificationBoxTitle>
        <slot name="title"></slot>
      </AtomNotificationBoxTitle>
      <AtomNotificationBoxDate>
        <slot name="date"></slot>
      </AtomNotificationBoxDate>
    </div>
    <div class="mb-4 rounded-xl">
      <AtomNotificationBoxContent>
        <slot></slot>
      </AtomNotificationBoxContent>
    </div>
  </div>
</template>
