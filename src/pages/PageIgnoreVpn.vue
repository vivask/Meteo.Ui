<template>
  <ui-box-vue :columns="boxCols" header="Hosts excluded from VPN">
    <q-table
      v-model:selected="selected"
      hide-header
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      :rows-per-page-options="[10, 50, 100, 0]"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            class="q-ml-xs"
            dense
            round
            color="primary"
            size="md"
            icon="mdi-ballot-recount"
            @click="handleRestore(props.row)"
          >
            <q-tooltip>Restore host</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="handleDelete(props.row)">
            <q-tooltip>Delete host</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useUtils } from '@/composables/useUtils.js';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

export default defineComponent({
  name: 'PageAutoVpn',

  components: {
    UiBoxVue,
  },

  setup() {
    const columns = [
      { name: 'name', align: 'left', field: 'id', sortable: true },
      {
        name: 'updated',
        align: 'left',
        field: 'updated',
        sortable: true,
        format: (val) => formatLongDate(val),
      },
      { name: 'actions' },
    ];

    const axios = inject('axios');
    const rows = ref([]);
    const wrapper = useTableWrapper('/proxy/ignorevpn', axios, rows);
    const confirm = useConfirmDialog();
    const spinner = ref(true);
    const selected = ref([]);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const { formatLongDate } = useUtils();

    onMounted(async () => {
      rows.value = await wrapper.Get();
    });

    return {
      spinner,
      columns,
      rows,
      selected,
      wrapper,
      confirm,
      boxCols,
      formatLongDate,

      async getHosts() {
        rows.value = await wrapper.Get();
      },

      async handleRestore(row) {
        const ok = await confirm.show('Are you sure to restore this items?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          console.log(data);
          rows.value = await wrapper.Restore(rows.value, data);
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
