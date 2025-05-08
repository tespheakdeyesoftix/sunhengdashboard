<template>
        <Card class="cs-m-top-2">
  <template #title>Performance Overview</template>
  <template #content>
    <DataTable :value="result" showGridlines stripedRows class="datatable-class">
      
      <!-- Empty Label Column -->
      <Column header="">
        <template #body="slotProps">
          {{ slotProps.data.val_name }}
        </template>
      </Column>

      <!-- No. (Visits) -->
      <Column header="No." headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.visits }}
        </template>
      </Column>

      <!-- Exam -->
      <Column header="Exam" headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.exams }}
        </template>
      </Column>

      <!-- Sold Exam -->
      <Column header="Sold Exam" headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.exam_sales }}
        </template>
      </Column>

      <!-- CV -->
      <Column header="CV" headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.cv }}
        </template>
      </Column>

      <!-- Sold -->
      <Column header="Sold" headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.solds }}
        </template>
      </Column>

      <!-- Target -->
      <Column header="Target" headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.target_sales }}
        </template>
      </Column>

      <!-- Difference -->
      <Column header="Dif." headerClass="text-center">
        <template #body="slotProps">
          <span :class="slotProps.data.different > 0 ? 'positive' : 'negative'">
            {{ slotProps.data.different }}
          </span>
        </template>
      </Column>

      <!-- FTW -->
      <Column header="FTW" headerClass="text-center">
        <template #body="slotProps">
          {{ slotProps.data.ftw }}
        </template>
      </Column>

    </DataTable>
  </template>
</Card> 
    <!-- <div class="table-container">
        <table class="dashboard-table">
                            <tr class="section-header">
                                <th colspan="9">Client</th>
                            </tr>
                            <tr class="table-header">
                                <th></th>
                                <th>No.</th>
                                <th>Exam</th>
                                <th>Sold Exam</th>
                                <th>CV</th>
                                <th>Sold</th>
                                <th>Target</th>
                                <th>Dif.</th>
                                <th>FTW</th>
                            </tr>
                            <tr>
                                <td>Today</td>
                                <td> $715</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                
                            </tr>
                            <tr>
                                <td>Week</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                
                            </tr>
                        </table>
                        <table class="dashboard-table cs-m-top-2">
                            <tr class="cogs-header">
                                <th colspan="3">Appointment & Follow</th>
                                <th colspan="5">Tracking Channels</th>
                            </tr>
                            <tr class="table-header">
                                <th></th>
                                <th>FU</th>
                                <th>AP</th>
                                <th>LY</th>
                                <th>TT</th>
                                <th>FB</th>
                                <th>GL</th>
                                <th>OT</th>
                            </tr>
                            <tr>
                                <td>Week</td>
                                <td>2</td>
                                <td>4</td>
                                <td>4</td>
                                <td>7</td>
                                <td>2</td>
                                <td>4</td>
                                <td>7</td>
                            </tr>
                            </table>
                            <table class="dashboard-table cs-m-top-2">
                            <tr class="section-header">
                                <th colspan="9">Client's Payment</th>
                            </tr>
                            <tr class="table-header">
                                <th></th>
                                <th>No. Paid</th>
                                <th>Amount</th>
                                <th>Remain</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>Today</td>
                                <td> $715</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                            </tr>
                            <tr>
                                <td>Week</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                                <td>$500</td>
                            </tr>
                        </table>
    
                       
    
       
    </div> -->
    
    </template>
    <script setup>
import { ref, onMounted, computed } from 'vue';
import DataTable from 'primevue/datatable';
import ProgressBar from 'primevue/progressbar';
import Card from 'primevue/card';
import Column from 'primevue/column';
import { useApi } from '../../composables/useAPI';
const result = ref(null);
const saleData = ref(null);
const cogsData = ref(null);
const profitData = ref(null);
const { error, loading, request } = useApi();
const loadData = async () => {
    result.value =
        await request('/GetData', 'POST', {
            procedure_name: 'sp_get_visit'
        })
};
onMounted(async () => {
    loadData()
    await request("/Outlet?$select=id,outlet_name").then(x=>{
        console.log(x.value)
    })
});
</script>
    <style scoped>
.table-container{
  background-color: rgb(250, 250, 250); 
  padding:15px;
  border-radius: 20px;
}
</style>