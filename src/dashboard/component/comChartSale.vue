<template>
  
  <Card class="table-content" >
    <template  #title>
      <span >
        Actual vs Estimated Sales
      </span>
      </template>
    <template #content>
      <div class="table-container cart-table" style="height:218px;">
    <div ref="chart" style="height:238px;"></div>
     </div>
    </template>
  </Card>
 
</template>

<script setup>
import * as echarts from 'echarts'
import Card from 'primevue/card';
import { onMounted, ref, watch } from 'vue'
import { useApi } from '../../composables/useAPI'

const chart = ref(null)
const result = ref([])
const { error, loading, request } = useApi()
const res = ref()
const loadData = async () => {
  res.value = await request('/GetData', 'POST', {
    procedure_name: 'sp_get_sale_actual_and_target_chart'
  })
  result.value = res.value
  initChart()
}

const initChart = () => {
  if (!chart.value || !result.value?.length) return;

  const myChart = echarts.init(chart.value);

const option = {
  textStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000'
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'
    },
    valueFormatter: (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  },
  legend: {
    data: ['Actual Sale', 'Estimate Sale' , 'Actual Cost' , 'Actual Profit'],
    top: -5,
    textStyle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'
    }
  },
  xAxis: {
    type: 'category',
    data: result.value.map(item => {
      const date = new Date(item.cal_date);
      return date.getDate();
    }),
    boundaryGap: false,
    axisLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'
    }
  },
  yAxis: {
    type: 'value',
    name: 'Sales',
    nameTextStyle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'
    },
    axisLabel: {
      formatter: (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      },
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000'
    }
  },
  series: [
    {
      name: 'Actual Sale',
      type: 'line',
      data: result.value.map(item => item.actual_sale ?? 0),
      smooth: true,
      label: {
        show: false
      }
    },
    {
      name: 'Estimate Sale',
      type: 'line',
      data: result.value.map(item => item.estimate_sale ?? 0),
      smooth: true,
      label: {
        show: false
      }
    },
    {
      name: 'Actual Cost',
      type: 'line',
      data: result.value.map(item => item.total_cost ?? 0),
      smooth: true,
      label: {
        show: false
      }
    },
    {
      name: 'Actual Profit',
      type: 'line',
      data: result.value.map(item => item.total_profit ?? 0),
      smooth: true,
      label: {
        show: false
      }
    }  
  ]
};


  myChart.setOption(option);
};





onMounted(async () => {
  await loadData()
})
defineExpose({
  loadData
})
</script>
<style scoped>
.p-card-caption{
  background-color: red;
}
</style>
