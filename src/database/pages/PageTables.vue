<template>
  <ui-box-vue
    :columns="boxCols"
    header="Local hosts"
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
          <ui-round-btn-vue color="primary" icon="add" tooltip="Add table name" @click="handleAdd()" />
          <ui-round-btn-vue
            color="positive"
            icon="mode_edit"
            tooltip="Edit table name"
            @click="handleEdit(props.row)"
          />
          <ui-round-btn-vue
            color="negative"
            icon="delete"
            tooltip="Delete table name"
            @click="handleDelete(props.row)"
          />
          <ui-round-btn-vue
            color="negative"
            icon="mdi-table-remove"
            tooltip="Drop table"
            @click="handleDdrop(props.row)"
          />
          <ui-round-btn-vue
            :disable="!props.row.import"
            color="warning"
            icon="mdi-table-arrow-left"
            tooltip="Import table content from csv"
            @click="handleImport(props.row)"
          />
          <ui-round-btn-vue
            color="secondary"
            icon="mdi-content-save"
            tooltip="Save table content to csv"
            @click="handleSave(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-table-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import UiBoxVue from '@/shared/components/UiBox.vue';
import UiRoundBtnVue from '@/shared/components/UiRoundBtn.vue';
import { useTableHandlers } from '@/shared/composables/useTableHandlers';
import FormTableVue from '../forms/FormTable.vue';
import { useConfirmDialog } from '@/shared/composables/useConfirmDialog.js';
import { createWrapper, Delete, Import, Save, Drop } from '../api/tableApi';
import { Notify } from 'quasar';

const columns = [
  { name: 'state', align: 'left', classes: 'wd-50' },
  { name: 'name', label: 'Name', align: 'left', field: 'name', classes: 'wd-100', sortable: true },
  { name: 'note', label: 'Note', align: 'left', field: 'note', classes: 'wd-100', sortable: true },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageTables',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormTableVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const spinner = ref(true);
    const form = ref(null);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const confirm = useConfirmDialog();
    const selected = ref([]);
    const visible = ref(false);

    const { handleAdd, handleEdit, handleSubmit, handleCancel } = useTableHandlers(visible, form, rows, wrapper, {});

    onMounted(async () => (rows.value = await wrapper.Get()));

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
      visible,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleCancel,

      async handleDelete(row) {
        let ok = await confirm.show('Are you sure to delete this items?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          ok = await Delete(data);
          if (ok) {
            rows.value = await wrapper.Get();
          }
        }
      },

      async handleImport(row) {
        let ok = await confirm.show('Are you sure to import this table from csv?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          ok = await Import(data);
          if (ok) {
            Notify.create({
              type: 'info',
              message: 'Import completed',
            });
          }
        }
      },

      async handleSave(row) {
        let ok = await confirm.show('Are you sure to save this table to csv?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          ok = await Save(data);
          if (ok) {
            Notify.create({
              type: 'info',
              message: 'Import completed',
            });
          }
        }
      },

      async handleDdrop(row) {
        let ok = await confirm.show('Are you sure to drop this tables?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          ok = await Drop(data);
          if (ok) {
            Notify.create({
              type: 'info',
              message: 'Drop completed',
            });
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
.wd-100
  width: 100px
  max-width: 100px
</style>
