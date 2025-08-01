<template>
  <Card class="product-bg mt-5">
    <template #title>
      Sales by Number of Products
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
  const dates = data.map(item => {
    const day = item.sale_date.split('-')[2]; // Extract day from '2025-07-DD'
    return parseInt(day, 10).toString(); // Remove leading zero
  });
  const frameQty = data.map(item => item.frame_qty);
  const lenQty = data.map(item => item.len_qty);
  const glassesQty = data.map(item => item.glasses_qty);
  const otherQty = data.map(item => item.other_qty);

  // Chart option setup
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let result = `Day ${params[0].name}<br/>`;
        params.forEach(item => {
          result += `${item.seriesName}: ${item.value}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Frame Qty', 'Lens Qty', 'Glasses Qty', 'Other Qty']
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value',
      name: 'Quantity'
    },
    series: [
      {
        name: 'Frame Qty',
        type: 'line',
        data: frameQty,
        smooth: true,
        lineStyle: { color: '#5470C6' }
      },
      {
        name: 'Lens Qty',
        type: 'line',
        data: lenQty,
        smooth: true,
        lineStyle: { color: '#91CC75' }
      },
      {
        name: 'Glasses Qty',
        type: 'line',
        data: glassesQty,
        smooth: true,
        lineStyle: { color: '#FAC858' }
      },
      {
        name: 'Other Qty',
        type: 'line',
        data: otherQty,
        smooth: true,
        lineStyle: { color: '#EE6666' }
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

defineExpose({
  loadData
});
</script>

<style scoped>
.table-container {
  border-radius: 20px;
}
</style>