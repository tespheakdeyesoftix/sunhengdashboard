<template>
    <Card class="cs-w-100 bg-visit-table" >
      <template #title>Appointment And Follow Up</template>
          <template #content>
      <DataTable
      :value="result"
      class="datatable-class"
      responsiveLayout="scroll"
      stripedRows showGridlines
      
    >
      <Column field="val_name" header="Period" />
      <Column field="appointments" header="Appointments" />
      <Column field="follow_ups" header="Follow Ups" />
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
    padding:15px;
    border-radius: 20px;
  }
  </style>