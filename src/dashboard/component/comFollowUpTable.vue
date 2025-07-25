<template>
    <Card class="cs-w-100 card-style bg-visit-table follow-up-table" style="margin-top:10; margin-right: 15px;" >
      <template #title> Follow Up </template>
          <template #content class="style-card">
      <DataTable
      :value="result"
      class="datatable-class cs-w-100" sresponsiveLayout="scroll"
      stripedRows showGridlines >
      <Column field="val_name" header="Period" />
      <Column field="follow_ups" header="FU" />
      <Column field="appointments" header="AP" />
      
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
              procedure_name: 'sp_get_appointment_and_follow_up'
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