<template>
    
      <Card class="product-bg">
  <template #content>
    <div class="">
      <div class="cs-col-6">
        <Card class="product-bg-table">
      <template #title>Sales By Product</template>
      <template #content>
        <DataTable :value="saleData" stripedRows showGridlines class="datatable-class">
          <Column header="Period">
            <template #body="slotProps">
             {{ slotProps.data.val_name == 'This Week' ? 'Week' : slotProps.data.val_name }}
            </template>
          </Column>

          <Column  headerClass="position-center" header="Frame">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.frame_qty }}</span>
                <span class="text-start">{{ slotProps.data.frame_amount }}</span>
              </div>
            </template>
          </Column>

          <Column headerClass="position-center" header="Lens">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.len_qty }}</span>
                <span class="text-start">{{ slotProps.data.len_amount }}</span>
              </div>
            </template>
          </Column>

          <Column headerClass="position-center" header="Sunglasses">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.glasses_qty }}</span>
                <span class="text-start">{{ slotProps.data.glasses_amount }}</span>
              </div>
            </template>
          </Column>
          <Column headerClass="position-center" header="Others">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.other_qty }}</span>
                <span class="text-start">{{ slotProps.data.other_amount }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
      </div>
      <div class="cs-col-6 cs-m-top-2">
        <Card  class="product-bg-table mt-5">
      <template #title>Inventory Stock</template>
      <template #content>
        <DataTable :value="stockData" stripedRows showGridlines class="datatable-class">
          <!-- Row Label -->
          <Column header="Period">
            <template #body="slotProps">
              {{ slotProps.data.val_name }}
            </template>
          </Column>

          <!-- Frame Column -->
          <Column headerClass="position-center" header="Frame">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.frame_qty }}</span>
                <span class="text-start">{{ slotProps.data.frame_amount }}</span>
              </div>
            </template>
          </Column>

          <!-- Lens Column -->
          <Column headerClass="position-center" header="Lens">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.len_qty }}</span>
                <span class="text-start">{{ slotProps.data.len_amount }}</span>
              </div>
            </template>
          </Column>

          <!-- Sunglasses Column -->
          <Column headerClass="position-center" header="Sunglasses">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.glasses_qty }}</span>
                <span class="text-start">{{ slotProps.data.glasses_amount }}</span>
              </div>
            </template>
          </Column>

          <!-- Others Column -->
          <Column headerClass="position-center" header="Others">
            <template #body="slotProps">
              <div class="item-table w-100">
                <span class="text-start">{{ slotProps.data.other_qty }}</span>
                <span class="text-start">{{ slotProps.data.other_amount }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
      </div>      
    </div>
   

  </template>
</Card>

                       

    </template>
    <script setup>
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useAPI';
import DataTable from 'primevue/datatable';
import Card from 'primevue/card';
import Column from 'primevue/column';
const result = ref(null);
const saleData = ref(null);
const stockData = ref(null);
const { error, loading, request } = useApi();
const loadData = async () => {
    result.value =
        await request('/GetData', 'POST', {
            procedure_name: 'sp_get_sale_product'
        })
    saleData.value = result.value.filter(i => i.section === 'Sale');
    stockData.value = result.value.filter(i => i.section === 'Stock');
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