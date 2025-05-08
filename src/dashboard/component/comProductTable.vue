<template>
    <div class="table-container">
    
        <table class="dashboard-table">
                            <tr class="section-header">
                                <th colspan="5">Sales By Product</th>
                            </tr>
                            <tr class="table-header">
                                <th></th>
                                <th class="text-center">Frame</th>
                                <th class="text-center">Lens</th>
                                <th class="text-center">Sunglasses</th>
                                <th class="text-center">Others</th>
                            </tr>
                            <tr v-for="i in saleData" :key="i.val_name">
  <td class="text-start">
    <span>{{ i.val_name }}</span>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.frame_qty }}</span>
      <span class="text-start">{{ i.frame_amount }}</span>
    </div>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.len_qty }}</span>
      <span class="text-start">{{ i.len_amount }}</span>
    </div>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.glasses_qty }}</span>
      <span class="text-start">{{ i.glasses_amount }}</span>
    </div>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.other_qty }}</span>
      <span class="text-start">{{ i.other_amount }}</span>
    </div>
  </td>
</tr>

                            
                        </table>
                        <table class="dashboard-table cs-m-top-2">
                            <tr class="section-header">
                                <th colspan="5">Inventory Stock</th>
                            </tr>
                            <tr class="table-header">
                                <th></th>
                                <th>Frame</th>
                                <th>Lens</th>
                                <th>Sunglasses</th>
                                <th>Others</th>
                            </tr>
                            <tr v-for="i in stockData" :key="i.val_name">
  <td class="text-start">
    <span>{{ i.val_name }}</span>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.frame_qty }}</span>
      <span class="text-start">{{ i.frame_amount }}</span>
    </div>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.len_qty }}</span>
      <span class="text-start">{{ i.len_amount }}</span>
    </div>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.glasses_qty }}</span>
      <span class="text-start">{{ i.glasses_amount }}</span>
    </div>
  </td>

  <td class="text-end">
    <div class="item-table w-100">
      <span class="text-start">{{ i.other_qty }}</span>
      <span class="text-start">{{ i.other_amount }}</span>
    </div>
  </td>
</tr>

                            </table>
    
                       
    
       
    </div>
    </template>
    <script setup>
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
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
</script>
    <style scoped>
.table-container{
  background-color: rgb(250, 250, 250); 
  padding:15px;
  border-radius: 20px;
}
</style>