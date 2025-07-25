<template>
  <Card class="cs-w-100 bg-visit-table Client_Payment"  style="margin-top:10px;">
    <template #title>Client's Payment</template>
        <template #content>
    <DataTable
    :value="result"
    class="datatable-class"
    responsiveLayout="scroll"
    stripedRows showGridlines
    
  >
    <Column field="val_name" header="Period" />
    <Column field="payment_amount" header="Payment Amount" />
    <Column field="payments" header="Payments" />
    <Column field="total_amount" header="Total Amount" />
    <Column field="balance" header="Balance" />
  </DataTable>         
        </template>
  
  </Card>
 
    </template>
    <script setup>
import { ref, onMounted, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Card from 'primevue/card';
import Column from 'primevue/column';
import { useApi } from '../../composables/useAPI';
const result = ref(null);
const { error, loading, request } = useApi();
const loadData = async () => {
    result.value =
        await request('/GetData', 'POST', {
            procedure_name: 'sp_get_payment'
        })
};
onMounted(async () => {
    loadData()
});
defineExpose({
  loadData
})
</script>
    <style scoped>
.table-container{
  background-color: rgb(250, 250, 250); 
  border-radius: 20px;
}
</style>