<template>
  <div>
    <div class="footer-msg great-job text-center" v-if="saleData?.length > 0 && (saleData[0].different_amount || 0) > 0">
      Great Job! Keep it up!
    </div>
    <div class="footer-msg call-more text-center" v-else>
      Call more customers!
    </div>

    </div>
  <Card class="cs-m-top-2 card-title-cs">
    <template #content>
      <div class="cs-flex col-down">
        <div>
          <Card class="bg-sale-product-table">
            <template #title>Sales</template>
            <template #content>

              <DataTable stripedRows showGridlines :value="saleData" class="datatable-class">
                <Column header="Period">
                  <template #body="slotProps">
                   <span class="text-start">
  {{ slotProps.data.val_name == 'This Week' ? 'Week' : slotProps.data.val_name }}
</span>

                  </template>
                </Column>
                <Column headerClass="positoin-center" header="Sales">
                  <template #body="slotProps">
                    <div class="item-table w-100">
                      <span class="text-start">{{ slotProps.data.sale_transactions }}</span>
                      <span class="text-start">{{ slotProps.data.sale_amount }}</span>
                    </div>
                  </template>
                </Column>
                <Column headerClass="positoin-center" header="Target">
                  <template #body="slotProps">
                    <div class="item-table w-100">
                      <span class="text-start">{{ slotProps.data.target_transactions }}</span>
                      <span class="text-start">{{ slotProps.data.target_amount }}</span>
                    </div>
                  </template>
                </Column>
                <Column headerClass="positoin-center" header="Difference">
                  <template #body="slotProps">
                    <div class="item-table w-100"
                      :class="slotProps.data.different_amount > 0 ? 'positive' : 'negative'">
                      <span class="text-start">{{ slotProps.data.different_transactions }}</span>
                      <span class="text-start">{{ slotProps.data.different_amount }}</span>
                    </div>
                  </template>
                </Column>
              </DataTable>

            </template>
          </Card>
        </div>
        <div class="cs-m-top-2">
          <Card class="bg-sale-product-table">
            <template #title>COGS and Rate</template>
            <template #content>
              <DataTable stripedRows showGridlines :value="cogsData" class="datatable-class">

                <!-- Label Column -->
                <Column header="Period">
                  <template #body="slotProps">
                     {{ slotProps.data.val_name == 'This Week' ? 'Week' : slotProps.data.val_name }}
                  </template>
                </Column>

                <!-- Actual -->
                <Column headerClass="positoin-center" header="Actual">
                  <template #body="slotProps">
                    <div class="item-table w-100">
                      <span class="text-start">{{ slotProps.data.sale_transactions }}</span>
                      <span class="text-start">{{ slotProps.data.sale_amount }}</span>
                    </div>
                  </template>
                </Column>

                <!-- Estimate -->
                <Column headerClass="positoin-center" header="Estimate">
                  <template #body="slotProps">
                    <div class="item-table w-100">
                      <span class="text-start">{{ slotProps.data.target_transactions }}</span>
                      <span class="text-start">{{ slotProps.data.target_amount }}</span>
                    </div>
                  </template>
                </Column>

                <!-- Difference -->
                <Column headerClass="positoin-center" header="Difference">
                  <template #body="slotProps">
                    <div class="item-table w-100"
                     >
                      <span class="text-start">{{ slotProps.data.different_transactions }}</span>
                      <span class="text-start">{{ slotProps.data.different_amount }}</span>
                    </div>
                  </template>
                </Column>

              </DataTable>
            </template>
          </Card>
        </div>
        <div class="cs-m-top-2">
          <Card class="bg-sale-product-table">
            <template #title>Profit and Rate</template>
            <template #content>
              <DataTable stripedRows showGridlines :value="profitData" class="datatable-class">
                <!-- Label Column -->
                <Column header="Period">
                  <template #body="slotProps">
                    <span>  {{ slotProps.data.val_name == 'This Week' ? 'Week' : slotProps.data.val_name }}</span>
                  </template>
                </Column>

                <!-- Actual Column -->
                <Column header="Actual" headerClass="text-center">
                  <template #body="slotProps">
                    <div class="item-table w-100">
                      <span class="text-start">{{ slotProps.data.sale_transactions }}</span>
                      
                      <span class="text-start">{{ slotProps.data.sale_amount }}</span>
                    </div>
                  </template>
                </Column>

                <!-- Estimate Column -->
                <Column header="Estimate" headerClass="text-center">
                  <template #body="slotProps">
                    <div class="item-table w-100">
                      
                      <span class="text-start">{{ slotProps.data.target_transactions }}</span>
                      <span class="text-start">
  {{ slotProps.data.target_amount }}
</span>

                    </div>
                  </template>
                </Column>

                <!-- Difference Column -->
                <Column header="Difference" headerClass="text-center">
                  <template #body="slotProps">
                    <div class="item-table w-100"
                    >
                      <span class="text-start">{{ slotProps.data.different_transactions }}</span>
                      <span class="text-start">
 {{ slotProps.data.different_amount }} 
</span>

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
import DataTable from 'primevue/datatable';
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
      procedure_name: 'sp_get_sale_target'
    })
  saleData.value = result.value.filter(i => i.section === 'Sale');
  cogsData.value = result.value.filter(i => i.section === 'COGS');
  profitData.value = result.value.filter(i => i.section === 'Profit');
};
onMounted(async () => {
  loadData()
});
defineExpose({
  loadData
})
</script>