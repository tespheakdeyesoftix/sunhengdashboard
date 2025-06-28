<template>
  <Card class="product-bg">
    <template #title>
      Sales by Products
    </template>
    <template #content>
      <div class="table-container product-bg-table">
        <div ref="chart" style="height: 300px;"></div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { useApi } from '../../composables/useAPI';
import Card from 'primevue/card';

const result = ref(null);
const { error, loading, request } = useApi();

const loadData = async () => {
  result.value = await request('/GetData', 'POST', {
    procedure_name: 'sp_get_sale_product_graphic'
  });
};

const chart = ref(null);
const setChart = () => {
  const data = result.value;

  // Extract data
  const months = data.map(item => `${item.month}-${item.year}`);
  const frameAmount = data.map(item => item.frame_amount);
  const lenAmount = data.map(item => item.len_amount);
  const glassesAmount = data.map(item => item.glasses_amount);
  const otherAmount = data.map(item => item.other_amount);

  // Chart option setup
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Frame Amt', 'Len Amt', 'Glasses Amt', 'Other Amt']
    },
    xAxis: {
      type: 'category',
      data: months
    },
    yAxis: {
      type: 'value',
      name: 'Amount ($)'
    },
    series: [
      {
        name: 'Frame Amt',
        type: 'line',
        data: frameAmount
      },
      {
        name: 'Len Amt',
        type: 'line',
        data: lenAmount
      },
      {
        name: 'Glasses Amt',
        type: 'line',
        data: glassesAmount
      },
      {
        name: 'Other Amt',
        type: 'line',
        data: otherAmount
      }
    ]
  };

  // Initialize and render chart
  const myChart = echarts.init(chart.value);
  myChart.setOption(option);
};

// Run when component mounts
onMounted(async () => {
  await loadData();
  setChart();
});

// Expose loadData for external trigger
defineExpose({
  loadData
});
</script>

<style scoped>
.table-container {
  padding: 15px;
  border-radius: 20px;
}
</style>
