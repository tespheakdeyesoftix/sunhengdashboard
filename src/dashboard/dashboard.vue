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
    v-model="selectedOutlets"
    :options="outlets"
     :showSelectAll="false"
    :selectAll="false"
    optionLabel="outlet_name"
    placeholder="Select Outlet"
    :maxSelectedLabels="1"
    style="min-width: 300px;"
    :invalid="isInvalid"
    @change="onOutletChange"
  />

  <Button @click="onRfresh" aria-label="Save"> &#x21bb; </Button>
    </div>
  </div>
        </div>
    <div class="container cs-flex h-full">
        <div class="cs-w-100 cs-col-4"> 
            <div class="cs-col-6 sale-bg">
                 <comChartSale ref="ChartSale" /> 
                 <comSaleTable ref="SaleTable" />
            </div>
        </div> 
        <div class="cs-flex cs-w-100 cs-col-4 bg-sale-product"> 
            <div class="cs-w-100" >  
                <comSaleTargetGraphicChart ref="SaleTargetGraphicChart" />  
                <ComTargetGraphicChart ref="TargetGraphicChart" />  
                <comProductTable ref="ProductTable" /> 
            </div>
        </div>    
        <div class="cs-w-100 cs-col-4 bg-visit">
      

                        <ComVisitGraphicChart ref="VisitGraphicChart" />
          <card>     
            <template #content>                   
                        <comClientTable ref="ClientTable" /> 
            </template>                      
       </card>
        <card>     
            <template #content>     
        <div class="cs-flex cs-w-100"> 
                        <div class="cs-col-4 cs-w-100" style="margin-left: 0; padding: 0;margin-right:5px;">
                           <ComFollowUpTable ref="FollowUpTable" />
                        </div>
                        <div class="cs-col-8" style="margin-left: 0; padding: 0;margin-right:5px;">
                           <ComTrackingChannel ref="TrackingChannel" /> 
                        </div>
                      
                     </div>
                       <div class="cs-w-100">
                            <ComClientPaymentTable ref="ClientPaymentTable"/>
                        </div>
          </template>                      
       </card>
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
import { onMounted, ref , computed } from 'vue'
import { useApi } from '@/composables/useAPI';
import ComClientPaymentTable from './component/comClientPaymentTable.vue';
import ComTrackingChannel from './component/comTrackingChannel.vue';
import ComTargetGraphicChart from './component/comTargetGraphicChart.vue';
import comSaleTargetGraphicChart from './component/comSaleTargetGraphicChart.vue';
import ComVisitGraphicChart from './component/ComVisitGraphicChart.vue';
import Card from 'primevue/card';
import ComFollowUpTable from './component/comFollowUpTable.vue';
const outlets = ref()
const selectedOutlets = ref([]);
const { error, loading, request } = useApi();

onMounted(async () => {
    const localSelectedOutlet = localStorage.getItem('selectedOutlet');  
    await request("/Outlet?$select=id,outlet_name").then(x=>{
        outlets.value = x.value
    }) 
    if (localSelectedOutlet){
selectedOutlets.value = localSelectedOutlet
  .split(',')
  .map(id => outlets.value.find(outlet => String(outlet.id) === id))


    }
})
const ChartSale = ref(null)
const SaleTable = ref(null)
const ProductTable = ref(null)
const TargetGraphicChart = ref(null)
const SaleTargetGraphicChart = ref(null)
const VisitGraphicChart = ref(null)
const ClientTable = ref(null)
const TrackingChannel = ref(null)
const ClientPaymentTable = ref(null)
const FollowUpTable = ref(null)
function onRfresh(){
    ChartSale.value?.loadData() 
    SaleTable.value?.loadData()
    ProductTable.value?.loadData()
    TargetGraphicChart.value?.loadData()
    SaleTargetGraphicChart.value?.loadData()
    VisitGraphicChart.value?.loadData()
    ClientTable.value?.loadData()
    TrackingChannel.value?.loadData()
    ClientPaymentTable.value?.loadData()
    FollowUpTable.value?.loadData()
}
const isInvalid = computed(() => selectedOutlets.value.length === 0);
function onOutletChange(event) {
    if (selectedOutlets.value.length === 0) {
    selectedOutlets.value = [outlets.value[0]];
    onRfresh()
  }

  if (Array.isArray(selectedOutlets.value)) {
    const ids = selectedOutlets.value.map(item => item.id).join(',');
    localStorage.setItem('selectedOutlet', ids);
  }
  onRfresh()

}


</script>
