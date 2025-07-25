<template>
  <Card class="product-bg">
    <template #title>
      Sales by Products
    </template>
    <template #content>
      <div class="table-container product-bg-table cart-table" style="height: 325px;">
        <div ref="chart" style="height: 325px;"></div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import Card from 'primevue/card';
import { useApi } from '../../composables/useAPI';

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
  const dates = data.map(item => {
    const day = item.sale_date.split('-')[2]; // Extract day from '2025-07-DD'
    return parseInt(day, 10).toString(); // Convert to number and back to string to remove leading zero
  });
  const frameAmount = data.map(item => item.frame_amount);
  const lenAmount = data.map(item => item.len_amount);
  const glassesAmount = data.map(item => item.glasses_amount);
  const otherAmount = data.map(item => item.other_amount);

  // Chart option setup
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let result = `Day ${params[0].name}<br/>`;
        params.forEach(item => {
          result += `${item.seriesName}: $${item.value.toFixed(2)}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Frame Amt', 'Lens Amt', 'Glasses Amt', 'Other Amt']
    },
    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: {
      type: 'value',
      name: 'Amount ($)',
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [
      {
        name: 'Frame Amt',
        type: 'line',
        data: frameAmount,
        lineStyle: { color: '#5470C6' }
      },
      {
        name: 'Lens Amt',
        type: 'line',
        data: lenAmount,
        lineStyle: { color: '#91CC75' }
      },
      {
        name: 'Glasses Amt',
        type: 'line',
        data: glassesAmount,
        lineStyle: { color: '#FAC858' }
      },
      {
        name: 'Other Amt',
        type: 'line',
        data: otherAmount,
        lineStyle: { color: '#EE6666' }
      }
    ],
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
  border-radius: 20px;
}
</style>