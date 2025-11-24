<script setup lang="ts">
interface TypeProps {
  text?: string;
}

const props = withDefaults(defineProps<TypeProps>(), {
  text: 'No User'
});
const acronym = computed(() => props.text.toString().slice(0, 2));

const bgColor = computed(() => stringToBrightColorCode(props.text));

function stringToBrightColorCode(inputString: string) {
  // Chuyển đổi chuỗi thành một số integer sử dụng hàm hash
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Tạo mã màu từ số đã chuyển đổi và giới hạn các thành phần màu trong khoảng từ 100 đến 200
  const r = (hash % 101) + 150;
  const g = ((hash >> 8) % 101) + 150;
  const b = ((hash >> 16) % 101) + 150;

  // Chuyển đổi thành phần màu thành mã HEX
  const colorCode = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;

  return colorCode;
}
</script>
<template>
  <div
    class="flex h-10 w-10 items-center justify-center rounded-lg border p-1 text-sm"
    :style="{
      backgroundColor: bgColor
    }"
  >
    {{ acronym }}
  </div>
</template>
