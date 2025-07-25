<template>
  <Card class="bg-visit-content">
    <template #title>Visit</template>
    <template #content>
      <div class="table-container bg-visit-table cart-table" style="height: 480px;">
        <div ref="chart" style="height: 480px;"></div>
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

// Fetch data from API
const loadData = async () => {
  result.value = await request('/GetData', 'POST', {
    procedure_name: 'sp_get_visit_graphic'
  });
};

// ECharts setup
const chart = ref(null);
const setChart = () => {
  const data = result.value;

  // Extract data
  const dates = data.map(item => {
    const day = item.transaction_date.split('-')[2]; // Extract day from '2025-07-DD'
    return parseInt(day, 10).toString(); // Remove leading zero
  });
  const visits = data.map(item => item.visits);
  const exams = data.map(item => item.exams);
  const solds = data.map(item => item.solds);
  const targetSales = data.map(item => item.target_sales);

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
      data: ['Visits', 'Exams', 'Solds Exams', 'Solds', 'Target']
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value',
      name: 'Count'
    },
    series: [
      {
        name: 'Visits',
        type: 'line',
        data: visits,
        smooth: true,
        lineStyle: { color: '#5470C6' }
      },
      {
        name: 'Exams',
        type: 'line',
        data: exams,
        smooth: true,
        lineStyle: { color: '#91CC75' }
      },
      {
        name: 'Solds Exams',
        type: 'line',
        data: exams, // Reusing exams as per original code
        smooth: true,
        lineStyle: { color: '#FAC858' }
      },
      {
        name: 'Solds',
        type: 'line',
        data: solds,
        smooth: true,
        lineStyle: { color: '#EE6666' }
      },
      {
        name: 'Target',
        type: 'line',
        data: targetSales,
        smooth: true,
        lineStyle: { color: '#73C0DE' }
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
  background-color: rgb(250, 250, 250);
  border-radius: 20px;
}
</style>