<template>
<Card >
     <template #title>Visit</template>
     <template #content>
    <div class="table-container bg-visit-table cart-table">
        <div ref="chart" style="height: 400px;"></div>
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

  const months = data.map(item => `${item.month}-${item.year}`);
  const visits = data.map(item => item.visits);
  const exams = data.map(item => item.exams);
  const solds = data.map(item => item.solds);
  const targetSales = data.map(item => item.target_sales);
  const different = data.map(item => item.different);

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Visits', 'Exams','Solds Exams', 'Solds', 'Target']
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
        name: 'Visits',
        type: 'line',
        data: visits
      },
      {
        name: 'Exams',
        type: 'line',
        data: exams
      },
      {
        name: 'Solds Exams',
        type: 'line',
        data: exams
      },
      {
        name: 'Solds',
        type: 'line',
        data: solds
      },
      {
        name: 'Target',
        type: 'line',
        data: targetSales
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
})
</script>

  
        <style scoped>
    .table-container{
      background-color: rgb(250, 250, 250); 
      padding:15px;
      border-radius: 20px;
    }
    </style>