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
        <div class="cs-w-100"> 
            <div class="cs-col-6">
                <comChartSale />
            </div>
            <div class="cs-col-6">
               <comSaleTable />
            </div>
        </div> 
        <div class="cs-w-100 cs-m-top-2"> 
            <div class="cs-col-6">
                <ComTargetGraphicChart />  
            </div>
            <div class="cs-col-6">
                <comProductTable /> 
            </div>
        </div>    
        <div class="cs-w-100">

                    <div class=""> 
                        <ComVisitGraphicChart />
                        
                    </div>
                    
                        <Card>
     <template #content>
        <div class="cs-flex cs-w-100">
                        <div class="cs-col-4">
                          <comClientTable />  
                        </div>
                        <div class="cs-col-4">
                           <ComTrackingChannel />  
                        </div>
                        <div class="cs-col-4">
                            <ComClientPaymentTable/>
                        </div>
                     </div>
     </template>
                    
                        </Card>
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
import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/useAPI';
import ComClientPaymentTable from './component/comClientPaymentTable.vue';
import ComTrackingChannel from './component/comTrackingChannel.vue';
import ComTargetGraphicChart from './component/comTargetGraphicChart.vue';
import ComVisitGraphicChart from './component/ComVisitGraphicChart.vue';
import Card from 'primevue/card';
const outlets = ref()
const selectedOutlet = ref('')
const { error, loading, request } = useApi();
onMounted(async () => {
    await request("/Outlet?$select=id,outlet_name").then(x=>{
        outlets.value = x.value
        console.log(outlets.value[0])
    })
})
</script>
