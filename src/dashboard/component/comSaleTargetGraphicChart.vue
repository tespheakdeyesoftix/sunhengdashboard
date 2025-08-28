<template>
  <Card class="product-bg">
    <template #title>
      Sales by Products
    </template>
    <template #content>
      <div class="table-container product-bg-table cart-table" style="height: 189px;">
        <div ref="chart" style="height: 220px;"></div>
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
    setChart();
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
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'  // Black tooltip text
    }
  },
legend: {
  data: ['Frame Amt', 'Lens Amt', 'Glasses Amt', 'Other Amt'],
  textStyle: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold'
  },
  type: "plain",
  left: "center",      // center the legend
  orient: "horizontal", // 🔹 keep legend in one row
  itemGap: 5,   
  top: -5,
},

  xAxis: {
    type: 'category',
    data: dates,
    axisLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'  // Black xAxis labels
    }
  },
  yAxis: {
    type: 'value',
    name: 'Amount ($)',
    axisLabel: {
      formatter: '${value}',
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'  // Black yAxis labels
    },
    nameTextStyle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'  // Black yAxis name
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
        show: false
      }
    },
    {
      name: 'Lens Amt',
      type: 'line',
      data: lenAmount,
      smooth: true,
      lineStyle: { color: '#91CC75' },
      label: {
        show: false
      }
    },
    {
      name: 'Glasses Amt',
      type: 'line',
      data: glassesAmount,
      smooth: true,
      lineStyle: { color: '#FAC858' },
      label: {
        show: false
      }
    },
    {
      name: 'Other Amt',
      type: 'line',
      data: otherAmount,
      smooth: true,
      lineStyle: { color: '#EE6666' },
      label: {
        show: false
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