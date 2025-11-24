<script setup lang="ts">
const { notificationList, closeToast } = useNotification();

const toastContainerRef = ref(null);

function onCloseItem(id: number) {
  closeToast(id);
}

onUpdated(() => {});
</script>
<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-0 right-0 top-6 z-[100] max-w-full overflow-hidden"
      ref="toastContainerRef"
    >
      <TransitionGroup name="list">
        <AtomNotificationItem
          v-for="(notificationItem, index) in notificationList"
          :id="notificationItem.id"
          :type="notificationItem.type"
          :title="notificationItem.title"
          :description="notificationItem.description"
          :key="notificationItem.id"
          @close="onCloseItem"
        >
        </AtomNotificationItem>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
