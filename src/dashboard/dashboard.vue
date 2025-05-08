<template>
       <div class="header-title bg-red-100">
<div >
    <h2 style="font-weight: bold;">
        DASHBOARD SALE 
        </h2>
    
</div>
<div>
    <div class="header-select">
        <MultiSelect
    v-model="selectedOutlet"
    :options="outlets"
    optionLabel="outlet_name"
    filter
    placeholder="Select Outlet"
    :maxSelectedLabels="1"
    style="min-width: 300px;"
  />
  <Button  aria-label="Save" > &#x21bb; </Button>
    </div>
  </div>
        </div>
    <div class="container">
    <ComTargetGraphicChart />
        <div class="cs-flex cs-w-100">
            <div class="cs-col-4">
                <div class="cs-w-100">
                    <div>
                        <comChartSale />
                    </div>
                    <div>
                        <comSaleTable />
                    </div>
                </div>
            </div>
            <div class="cs-col-4">
                <div ref="chart" style="width: 100%; height: 400px;"></div>
                <comProductTable />
            </div>
            <div class="cs-col-4">
                <div ref="chart" style="width: 100%; height: 400px;"></div>
                <div class="table-container">
                    <comClientTable />
                    <ComTrackingChannel />
                    <ComClientPaymentTable/>
                
                </div>
                
            </div>

        </div>
    </div>
 
</template>
<script setup>

import MultiSelect from 'primevue/multiselect';

import Button from 'primevue/button';

import comSaleTable from '../dashboard/component/comSaleTable.vue'
import comProductTable from '../dashboard/component/comProductTable.vue'
import comClientTable from '../dashboard/component/comClientTable.vue'
import comChartSale from '../dashboard/component/comChartSale.vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/useAPI';
import ComClientPaymentTable from './component/comClientPaymentTable.vue';
import ComTrackingChannel from './component/comTrackingChannel.vue';
import ComTargetGraphicChart from './component/comTargetGraphicChart.vue';

const outlets = ref()

const selectedOutlet = ref('')
const chart = ref(null)
const { error, loading, request } = useApi();
onMounted(async () => {
    await request("/Outlet?$select=id,outlet_name").then(x=>{
        outlets.value = x.value
        console.log(outlets.value[0])
    })
    const myChart = echarts.init(chart.value)
    const option = {
        title: {
            text: 'Sales Example'
        },
        tooltip: {},
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [{
            name: 'Sales',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130]
        }]
    }

    myChart.setOption(option)
})
</script>
