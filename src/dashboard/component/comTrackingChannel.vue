<template>
  <Card style="margin-right:5px;margin-left: 5px;" class="bg-visit-table Tracking_Channel" >
    <template #title>Tracking Channel</template>
        <template #content>
    <DataTable
    :value="result"
    class="datatable-class"
    responsiveLayout="scroll"
    stripedRows showGridlines
    
  >
    <Column field="val_name" header="Period" />
    <Column header="LY" field="ly" />
    <Column header="TT" field="tt" />
    <Column header="FB" field="fb" />
    <Column header="GL" field="gl" />
    <Column header="OT" field="ot" />
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
            procedure_name: 'sp_get_tracking_channel'
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
  padding:15px;
  border-radius: 20px;
}
</style>