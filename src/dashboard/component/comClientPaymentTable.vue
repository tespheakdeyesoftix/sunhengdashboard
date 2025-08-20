<template>
  <Card class="cs-w-100 bg-visit-table Client_Payment"  style="margin-top:10px;">
    <template #title>Client's Payment</template>
        <template #content>
  <DataTable
  :value="result"
  class="datatable-class"
  responsiveLayout="scroll"
  stripedRows
  showGridlines
>
 <Column header="Period">
  <template #body="slotProps">
    {{ slotProps.data.val_name === 'This Week' ? 'Week' : slotProps.data.val_name }}
  </template>
</Column>

  <!-- Change header label -->
  <Column field="payment_amount" header="P.Amount" />

  <Column field="payments" header="Payments" />

  <!-- Change header label -->
  <Column field="total_amount" header="T.Amount" />

  <Column field="balance" header="Balance" />

  <!-- Assuming Inventory Stock field is `inventory_stock` -->
  <Column
    field="inventory_stock"
    header="Stock"
    :body="roundInventoryStock"
  />
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