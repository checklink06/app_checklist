<script setup lang="ts">
import {
  Chart,
  DoughnutController,
  ArcElement,
  Colors,
  BarController,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
} from 'chart.js';

Chart.register(
  Colors,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  Legend
);

interface TypeProps {
  data?: any;
  type: 'doughnut' | 'bar';
  options?: object;
}

const props = withDefaults(defineProps<TypeProps>(), {
  data: () => ({}),
  options: () => ({})
});

let chartInstance: any = null;

const canvasRef = ref<HTMLCanvasElement | null>(null);

watch(
  () => props.data,
  () => {
    chartInstance.data.labels = props.data.labels;
    chartInstance.data.datasets.forEach((dataset: any, index: number) => {
      dataset.data = props.data.datasets[index].data;
    });
    chartInstance.update();
  }
);

onMounted(() => {
  if (canvasRef.value) {
    chartInstance = new Chart(canvasRef.value, {
      type: props.type,
      options: props.options,
      data: props.data
    });
  }
});
</script>
<template>
  <canvas ref="canvasRef"></canvas>
</template>
