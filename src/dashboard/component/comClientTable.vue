<template>
        <Card class="cs-w-100 bg-visit-table bg-visit-table-10">
  <template #title>Performance Overview</template>
  <template #content>
    <DataTable :value="result" showGridlines stripedRows class="datatable-class">
      
      <!-- Empty Label Column -->
      <Column header="Period">
        <template #body="slotProps">
          {{ slotProps.data.val_name }}
        </template>
      </Column>

      <!-- No. (Visits) -->
      <Column header="Visit" headerClass="text-center">
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
      <Column header="S.Exam" headerClass="text-center">
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
    </template>
    <script setup>
import { ref, onMounted, computed } from 'vue';
import DataTable from 'primevue/datatable';
import ProgressBar from 'primevue/progressbar';
import Card from 'primevue/card';
import Column from 'primevue/column';
import { useApi } from '../../composables/useAPI';
const result = ref(null);
const { error, loading, request } = useApi();
const loadData = async () => {
    result.value =
        await request('/GetData', 'POST', {
            procedure_name: 'sp_get_visit'
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