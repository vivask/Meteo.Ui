<template>
  <ui-box-vue :columns="boxCols" header="Table Synchronization">
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[0, 10, 50, 100]">
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
import { defineComponent, computed, ref, onMounted } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import { getTables, syncTable } from '../api/syncApi';
import { useConfirmDialog } from 'src/app/composables/useConfirmDialog.js';
import { Notify } from 'quasar';

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
    const selected = ref([]);
    const allSelected = ref(false);
    const rows = ref([]);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const disable = computed(() => selected.value.length === 0);
    const confirm = useConfirmDialog();

    onMounted(async () => (rows.value = await getTables()));

    const handleAllSync = async () => {
      let ok = await confirm.show('Synchronizing multiple tables will take a long time. Continue?');
      if (ok) {
        for (let row of selected.value) {
          ok = await syncTable(row);
          if (ok) {
            Notify.create({
              type: 'info',
              message: `Table ${row.name} synchronization success!`,
            });
          }
        }
        selected.value = [];
      }
    };

    return {
      selected,
      allSelected,
      columns,
      rows,
      boxCols,
      disable,
      handleAllSync,

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

      async handleSync(row) {
        if (selected.value.length) {
          handleAllSync();
        } else {
          let ok = await confirm.show('Synchronization will take some time. Continue?');
          if (ok) {
            ok = await syncTable(row);
            if (ok) {
              Notify.create({
                type: 'info',
                message: `Table ${row.name} synchronization success!`,
              });
            }
          }
        }
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
