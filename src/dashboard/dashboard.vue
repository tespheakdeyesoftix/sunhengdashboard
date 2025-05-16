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
    <div class="container">
        <div class="cs-w-100"> 
            <div class="cs-col-6">
                <comChartSale ref="ChartSale" />
            </div>
            <div class="cs-col-6">
               <comSaleTable ref="SaleTable" />
            </div>
        </div> 
        <div class="cs-flex cs-w-100 cs-m-top-2"> 
            <div class="cs-col-8">
                <ComTargetGraphicChart ref="TargetGraphicChart" />  
            </div>
            <div class="cs-col-4">
                <comProductTable ref="ProductTable" /> 
            </div>
        </div>    
        <div class="cs-w-100 cs-m-top-2">
            <div class="cs-flex">
<div class="cs-col-8"> 
                        <ComVisitGraphicChart ref="VisitGraphicChart" />
                    </div>
                    <div class="cs-col-4">
                        <Card class="bg-visit" style="height: 100%;">
                            <template #content>
                        <comClientTable ref="ClientTable" /> 
                                </template>
                        </Card>
                    </div>
            </div>
                    
                        <Card class="bg-visit cs-m-top-2">
     <template #content>
        <div class="cs-flex cs-w-100">
                        <div class="cs-col-4">
                          <ComTrackingChannel ref="TrackingChannel" />  
                        </div>
                        <div class="cs-col-4">
                           <ComFollowUpTable ref="FollowUpTable" />
                        </div>
                        <div class="cs-col-4">
                            <ComClientPaymentTable ref="ClientPaymentTable"/>
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
import { onMounted, ref , computed } from 'vue'
import { useApi } from '@/composables/useAPI';
import ComClientPaymentTable from './component/comClientPaymentTable.vue';
import ComTrackingChannel from './component/comTrackingChannel.vue';
import ComTargetGraphicChart from './component/comTargetGraphicChart.vue';
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
