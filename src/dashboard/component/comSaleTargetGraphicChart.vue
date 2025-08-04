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
  if (!data || !data.length) return;

  // Prepare data
  const dates = data.map(item => {
    const day = item.sale_date.split('-')[2];
    return parseInt(day, 10).toString();
  });
  const frameAmount = data.map(item => item.frame_amount);
  const lenAmount = data.map(item => item.len_amount);
  const glassesAmount = data.map(item => item.glasses_amount);
  const otherAmount = data.map(item => item.other_amount);

  // Chart options
  const option = {
    textStyle: {
      fontSize: 18,
      fontFamily: 'Arial, sans-serif',
      color: '#000' // Default font color
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let result = `Day ${params[0].name}<br/>`;
        params.forEach(item => {
          result += `${item.seriesName}: $${item.value.toFixed(2)}<br/>`;
        });
        return result;
      },
      textStyle: {
        fontSize: 18
      }
    },
    legend: {
      data: ['Frame Amt', 'Lens Amt', 'Glasses Amt', 'Other Amt'],
      textStyle: {
        fontSize: 18,
        color: '#333'
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        fontSize: 18
      }
    },
    yAxis: {
      type: 'value',
      name: 'Amount ($)',
      axisLabel: {
        formatter: '${value}',
        fontSize: 18
      },
      nameTextStyle: {
        fontSize: 18
      }
    },
    series: [
      {
        name: 'Frame Amt',
        type: 'line',
        data: frameAmount,
        smooth: true,
        lineStyle: { color: '#5470C6' },
        label: {
          show: true,
          fontSize: 18
        }
      },
      {
        name: 'Lens Amt',
        type: 'line',
        data: lenAmount,
        smooth: true,
        lineStyle: { color: '#91CC75' },
        label: {
          show: true,
          fontSize: 18
        }
      },
      {
        name: 'Glasses Amt',
        type: 'line',
        data: glassesAmount,
        smooth: true,
        lineStyle: { color: '#FAC858' },
        label: {
          show: true,
          fontSize: 18
        }
      },
      {
        name: 'Other Amt',
        type: 'line',
        data: otherAmount,
        smooth: true,
        lineStyle: { color: '#EE6666' },
        label: {
          show: true,
          fontSize: 18
        }
      }
    ]
  };

  // Render chart
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