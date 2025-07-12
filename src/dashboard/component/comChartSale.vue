<template>
  
  <Card >
    <template #title>
      <span class="title">
        Actual vs Estimated Sales
      </span>
      </template>
    <template #content>
      <div class="table-container cart-table">
    <div ref="chart" style="width: 100%; height: 400px;"></div>
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
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Actual Sale', 'Estimate Sale'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: result.value.map(item => {
  const date = new Date(item.cal_date);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit'
  });
}),

      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: 'Sales'
    },
    series: [
      {
        name: 'Actual Sale',
        type: 'line',
        data: result.value.map(item => item.actual_sale),
        smooth: true
      },
      {
        name: 'Estimate Sale',
        type: 'line',
        data: result.value.map(item => item.estimate_sale),
        smooth: true
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
