<template>
  <div class="table-container">
    <div ref="chart" style="height: 400px;"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
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

  const months = data.map(item => `${item.month}-${item.year}`);
  const frameQty = data.map(item => item.frame_qty);
  const lenQty = data.map(item => item.len_qty);
  const glassesQty = data.map(item => item.glasses_qty);
  const otherQty = data.map(item => item.other_qty);

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Frame Qty', 'Len Qty', 'Glasses Qty', 'Other Qty']
    },
    xAxis: {
      type: 'category',
      data: months
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Frame Qty',
        type: 'line',
        data: frameQty
      },
      {
        name: 'Len Qty',
        type: 'line',
        data: lenQty
      },
      {
        name: 'Glasses Qty',
        type: 'line',
        data: glassesQty
      },
      {
        name: 'Other Qty',
        type: 'line',
        data: otherQty
      }
    ]
  };

  // Initialize the chart
  const myChart = echarts.init(chart.value);
  myChart.setOption(option);
};

// Load data on component mount
onMounted(async () => {
  await loadData();
  setChart();
});
</script>

      <style scoped>
  .table-container{
    background-color: rgb(250, 250, 250); 
    padding:15px;
    border-radius: 20px;
  }
  </style>