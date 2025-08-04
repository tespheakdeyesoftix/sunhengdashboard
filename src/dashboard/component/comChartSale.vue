<template>
  
  <Card class="table-content" >
    <template  #title>
      <span >
        Actual vs Estimated Sales
      </span>
      </template>
    <template #content>
      <div class="table-container cart-table" style="height:438px;">
    <div ref="chart" style="width: 100%; height:438px;"></div>
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
  if (!chart.value || !result.value?.length) return

  const myChart = echarts.init(chart.value)

  const option = {
    textStyle: {
      fontSize: 18 // 🧱 Global default font size
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 18
      }
    },
    legend: {
      data: ['Actual Sale', 'Estimate Sale'],
      textStyle: {
        fontSize: 18,
        color: '#333'
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
        fontSize: 18
      }
    },
    yAxis: {
      type: 'value',
      name: 'Sales',
      nameTextStyle: {
        fontSize: 18
      },
      axisLabel: {
        fontSize: 18
      }
    },
    series: [
      {
        name: 'Actual Sale',
        type: 'line',
        data: result.value.map(item => item.actual_sale),
        smooth: true,
        label: {
          show: true,
          fontSize: 18
        }
      },
      {
        name: 'Estimate Sale',
        type: 'line',
        data: result.value.map(item => item.estimate_sale),
        smooth: true,
        label: {
          show: true,
          fontSize: 18
        }
      }
    ]
  }

  myChart.setOption(option)
}



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
