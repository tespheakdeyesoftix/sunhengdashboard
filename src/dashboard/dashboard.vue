<template>
       <div class="header-title bg-red-100">
<div >
    <h4 style="font-weight: bold;font-size: 20px !important;">
        SMART DASHBOARD - {{ currentMonthYear }}
    </h4>
    
</div>
  <div class="clock-box">
    <div class="time">
      {{ liveTime }}
    </div>
    <div class="date">
      {{ day }}, {{ month }} <span class="green">{{ date }}</span> {{ year }}
    </div>
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

  <Button @click="onRfreshBT" class="refresh" :style="{ backgroundImage: `url(${refreshIcon})` }" aria-label="Save"> 
</Button>

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
 
 <Dialog v-model:visible="showLoading" modal header="Loading..." :style="{ width: '50rem' }" position="top">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Refreshing your data.</span>
     <ProgressBar mode="indeterminate" style="height: 10px"></ProgressBar>
</Dialog>

</template>
<script setup>

import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
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
import refreshIcon from '@/assets/Refresh.png'
const currentMonthYear = ref('')
const liveTime = ref('')
const ampm = ref('')
const day = ref('')
const date = ref('')
const month = ref('')
const year = ref('')
  import { useRoute } from 'vue-router';
const route = useRoute();
const iframeHeight = ref("1080px")
const showLoading = ref(false)

import ProgressBar from 'primevue/progressbar';

function updateClock() {
  const now = new Date()

  // Time
  const hrs = now.getHours()
  const mins = String(now.getMinutes()).padStart(2, '0')
  const secs = String(now.getSeconds()).padStart(2, '0')
  ampm.value = hrs >= 12 ? 'PM' : 'AM'
  const hours12 = String(hrs % 12 || 12).padStart(2, '0')
  liveTime.value = `${hours12}:${mins}:${secs}`

  // Date
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  day.value = days[now.getDay()]
  month.value = months[now.getMonth()]
  date.value = String(now.getDate()).padStart(2, '0')
  year.value = now.getFullYear()
}
function updateDate() {
  const now = new Date()
  const month = now.toLocaleString('default', { month: 'long' }) // e.g., "Jul"
  const year = now.getFullYear()
  currentMonthYear.value = `${month} ${year}`
}

function updateTime() {
  const now = new Date()
  const hours = now.getHours() % 12 || 12
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
  liveTime.value = `${hours}:${minutes}:${seconds} ${ampm}`
}


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
      updateDate()
      updateClock()
  updateTime()

 


  setTimeout(() => {
    iframeHeight.value =route.query.h || "120vh";  
    
    const body = document.querySelector("body")
    body.style.height = iframeHeight.value;
 

  }, 2000);


  setInterval(updateTime, 1000)
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
async function onRfreshBT(){
  showLoading.value = true;
  setTimeout(async () => {
      await ChartSale.value?.loadData() 
    await SaleTable.value?.loadData()
    await ProductTable.value?.loadData()
    await TargetGraphicChart.value?.loadData()
    await SaleTargetGraphicChart.value?.loadData()
    await VisitGraphicChart.value?.loadData()
    await ClientTable.value?.loadData()
    await TrackingChannel.value?.loadData()
    await ClientPaymentTable.value?.loadData()
    await FollowUpTable.value?.loadData()
     showLoading.value = false;
  }, 1000);
 
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
<style scoped>
.clock-box {
  display: inline-block;
  border-radius: 20px;
  background-color: white;
  text-align: center;
  line-height: 17px;
  font-family:"alarm clock";
}

.time {
  font-size: 16px;
  color: black;
  font-weight: bold;
}

.ampm {
  margin-left: 8px;
  font-size: 20px;
}

.date {
  font-size: 14px;
  color: gray;
  margin-top: 4px;
}

.green {
  color: green;
  font-weight: bold;
}
.refresh{
       background-position: center;
    background-size: 60px; 
    background-color: none !important;
    border-color: gray;
}
</style>