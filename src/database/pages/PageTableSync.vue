<template>
  <ui-box-vue :columns="boxCols" header="Table Synchronization" :spinner="spinner">
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #top>
        <q-checkbox v-model="allSelected" color="grey" @update:model-value="handleSelectedAll" />
        <p class="header-table text-caption">Table</p>
        <p class="header-method text-caption">Method</p>
        <p class="header-direction text-caption">Direction</p>
        <q-space />
        <q-btn class="q-ml-xs" dense color="warning" size="md" icon="sync" :disabled="disable" @click="handleAllSync" />
      </template>

      <template #body-cell-selected="props">
        <q-td :props="props" class="wd-50">
          <q-checkbox
            v-model="props.row.selected"
            color="grey"
            @update:model-value="(val) => handleSelected(props.row, val)"
          />
        </q-td>
      </template>
      <template #body-cell-method="props">
        <q-td :props="props">
          <q-select v-model="props.row.method" standout dense :options="props.row.params" option-label="note" />
        </q-td>
      </template>
      <template #body-cell-direction="props">
        <q-td :props="props">
          <q-btn
            class="q-ml-xs"
            dense
            color="warning"
            size="md"
            :val="props.rowIndex"
            :label="props.row.direction"
            @click="handleDirection(props.rowIndex)"
          />
        </q-td>
      </template>
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn class="q-ml-xs" dense color="warning" size="md" icon="sync" @click="handleSync(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, computed, ref, inject, onMounted } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';

const columns = [
  { name: 'selected' },
  { name: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'method', classes: 'wd-180' },
  { name: 'direction' },
  { name: 'action' },
];

export default defineComponent({
  name: 'PageTableSync',

  components: {
    UiBoxVue,
  },

  setup() {
    const axios = inject('axios');
    const spinner = ref(true);
    const selected = ref([]);
    const allSelected = ref(false);
    const rows = ref([]);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const disable = computed(() => selected.value.length === 0);

    onMounted(() =>
      axios.get('/database/tables').then((resp) => {
        let result = resp.data.data;
        for (let idx in result) {
          result[idx].selected = false;
          result[idx].method = 'Replace';
          result[idx].direction = 'Main => Back';
          for (let i in result[idx].params) {
            result[idx].params[i].note = result[idx].params[i].stype.note;
          }
        }
        rows.value = result;
      }),
    );

    return {
      spinner,
      selected,
      allSelected,
      columns,
      rows,
      boxCols,
      disable,

      handleSelectedAll(toggle) {
        if (toggle) {
          for (let idx in rows.value) {
            rows.value[idx].selected = true;
          }
          selected.value = rows.value;
        } else {
          for (let idx in rows.value) {
            rows.value[idx].selected = false;
          }
          selected.value = [];
        }
      },

      handleSelected(row, toggle) {
        if (toggle) {
          selected.value.push(row);
        } else {
          selected.value = selected.value.filter((item) => item !== row);
        }
      },

      handleDirection(idx) {
        rows.value[idx].direction = rows.value[idx].direction === 'Main => Back' ? 'Main <= Back' : 'Main => Back';
      },

      handleSync(row) {
        console.log('handleSync: ', row);
      },

      handleAllSync(event) {
        console.log('handleAllSync: ', event);
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-50
  width: 50px
  max-width: 50px
.wd-180
  width: 180px
  max-width: 180px
.header-table
  margin-top: 20px
  margin-left: 10px
.header-method
  margin-top: 20px
  margin-left: 110px
.header-direction
  margin-top: 20px
  margin-left: 140px
</style>
