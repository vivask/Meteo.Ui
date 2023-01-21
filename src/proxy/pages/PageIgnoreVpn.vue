<template>
  <ui-box-vue :columns="boxCols" header="Hosts excluded from VPN">
    <q-table
      v-model:selected="selected"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      :rows-per-page-options="[10, 50, 100, 0]"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue
            color="primary"
            icon="mdi-ballot-recount"
            tooltip="Restore host"
            @click="handleRestore(props.row)"
          />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete host" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onActivated, onMounted } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import { useUtils } from '../../app/composables/useUtils.js';
import { createWrapper } from '../api/ignoreVpnApi';
import UiRoundBtnVue from '../../app/components/UiRoundBtn.vue';
import { useConfirmDialog } from '../../app/composables/useConfirmDialog.js';

export default defineComponent({
  name: 'PageIgnoreVpn',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
  },

  setup() {
    const columns = [
      { name: 'name', label: 'Host', align: 'left', field: 'id', sortable: true },
      {
        name: 'updated',
        label: 'Create At',
        align: 'left',
        field: 'updated',
        sortable: true,
        format: (val) => formatLongDate(val),
      },
      { name: 'actions' },
    ];

    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const confirm = useConfirmDialog();
    const selected = ref([]);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const { formatLongDate } = useUtils();

    onMounted(async () => {
      rows.value = await wrapper.Get(true);
    });

    onActivated(async () => {
      rows.value = await wrapper.Get();
    });

    return {
      columns,
      rows,
      selected,
      wrapper,
      confirm,
      boxCols,
      formatLongDate,

      async handleRestore(row) {
        const ok = await confirm.show('Are you sure to restore this items?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          rows.value = await wrapper.Restore(data);
        }
      },

      async handleDelete(row) {
        const ok = await confirm.show('Are you sure to delete this item?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          rows.value = await wrapper.Delete(rows.value, data);
        }
      },
    };
  },
});
</script>
