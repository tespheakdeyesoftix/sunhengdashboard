<template>
  <Card >
    <template #title>Sales by Number Of Products
    </template>
    <template #content>
      <div class="table-container product-bg-table">
        <div ref="chart" style="height: 200px;"></div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useApi } from '../../composables/useAPI';
import Card from 'primevue/card';

const result = ref(null);
const chart = ref(null);
const myChartInstance = ref(null);

const { error, loading, request } = useApi();

const loadData = async () => {
  // Replace this with your actual API call
  result.value = await request('/GetData', 'POST', {
    procedure_name: 'sp_get_sale_target_graphic'
  });

};

const setChart = () => {
  if (!result.value || !chart.value) return;

  // Dispose previous instance if any
  if (myChartInstance.value) {
    myChartInstance.value.dispose();
  }

  myChartInstance.value = echarts.init(chart.value);

  const months = result.value.map(item => `${item.month}-${item.year}`);
  const totalAmount = result.value.map(item => item.total_amount);
  const totalCost = result.value.map(item => item.total_cost);
  const totalProfit = result.value.map(item => item.total_profit);
  const saleTarget = result.value.map(item => item.sale_target);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        let tooltipText = `${params[0].axisValue}<br/>`;
        params.forEach(p => {
          tooltipText += `${p.marker} ${p.seriesName}: $${p.data.toFixed(2)}<br/>`;
        });
        return tooltipText;
      }
    },
    legend: {
      data: ['Total Amount', 'Total Cost', 'Total Profit', 'Sale Target'],
      top: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: {
        formatter: value => {
          // Optional: format month-year as "Jan 2025"
          const [month, year] = value.split('-');
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return `${monthNames[parseInt(month) - 1]} ${year}`;
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: value => `$${value}`
      }
    },
    series: [
      {
        name: 'Total Amount',
        type: 'line',
        data: totalAmount,
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#5470C6' }
      },
      {
        name: 'Total Cost',
        type: 'line',
        data: totalCost,
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#91CC75' }
      },
      {
        name: 'Total Profit',
        type: 'line',
        data: totalProfit,
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#EE6666' }
      },
      {
        name: 'Sale Target',
        type: 'line',
        data: saleTarget,
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#FAC858' }
      }
    ]
  };

  myChartInstance.value.setOption(option);
};

onMounted(async () => {
  await loadData();
  setChart();

  // Resize chart on window resize
  window.addEventListener('resize', () => {
    if (myChartInstance.value) myChartInstance.value.resize();
  });
});

defineExpose({ loadData });
</script>

<style scoped>
.table-container {
  padding: 15px;
  border-radius: 20px;
  background-color: #fff;
}
.product-bg {
  background-color: #f5f5f5;
}
.product-bg-table {
  background-color: #ffffff;
}
.title {
  font-weight: 600;
  font-size: 1.3rem;
}
</style>
