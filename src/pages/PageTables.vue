<template>
  <ui-box-vue
    :columns="boxCols"
    header="Local hosts"
    :spinner="spinner"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table
      v-model:selected="selected"
      hide-header
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :rows-per-page-options="[10, 50, 100, 0]"
    >
      <template #body-cell-state="props">
        <q-td :props="props">
          <q-icon name="mdi-table" size="2rem" />
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd()">
            <q-tooltip>Add table name</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="handleEdit(props.row)">
            <q-tooltip>Edit table name</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="handleDelete(props.row)">
            <q-tooltip>Delete table name</q-tooltip>
          </q-btn>
          <q-btn
            class="q-ml-xs"
            dense
            :disable="!props.row.import"
            round
            color="warning"
            size="md"
            icon="mdi-table-arrow-left"
            @click="handleImport(props.row)"
          >
            <q-tooltip>Import table content from csv</q-tooltip>
          </q-btn>
          <q-btn
            class="q-ml-xs"
            dense
            round
            color="secondary"
            size="md"
            icon="mdi-content-save"
            @click="handleSave(props.row)"
          >
            <q-tooltip>Save table content to csv</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-table-vue ref="form" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useTableHandlers } from '@/composables/useTableHandlers';
import FormTableVue from '@/forms/FormTable.vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

const columns = [
  { name: 'state' },
  { name: 'address', align: 'left', field: 'address', sortable: true },
  { name: 'name', align: 'left', field: 'name' },
  { name: 'mac', align: 'left', field: 'mac' },
  { name: 'note', align: 'left', field: 'note' },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageZones',

  components: {
    UiBoxVue,
    FormTableVue,
  },

  setup() {
    const axios = inject('axios');
    const rows = ref([]);
    const wrapper = useTableWrapper('/database/tables', axios, rows);
    const spinner = ref(true);
    const form = ref(null);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const confirm = useConfirmDialog();
    const selected = ref([]);

    const { handleAdd, handleEdit, handleSubmit } = useTableHandlers(form, rows, wrapper, {});

    onMounted(async () => {
      rows.value = await wrapper.Get();
    });

    return {
      spinner,
      columns,
      rows,
      buttonShow,
      wrapper,
      form,
      boxCols,
      confirm,
      selected,

      handleAdd,
      handleEdit,
      handleSubmit,

      async handleDelete(row) {
        const ok = await confirm.show('Are you sure to delete this items?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          axios.delete('/database/tables', data);
        }
      },

      async handleImport(row) {
        const ok = await confirm.show('Are you sure to import this table from csv?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          axios.put('/database/import', data);
        }
      },

      async handleSave(row) {
        const ok = await confirm.show('Are you sure to save this table to csv?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          axios.put('/database/save', data);
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-30
  width: 30px
  max-width: 30px
.wd-100
  width: 100px
  max-width: 100px
</style>
