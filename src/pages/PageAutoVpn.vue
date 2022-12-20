<template>
  <ui-box-vue :columns="boxCols" header="Hosts Redirected to VPN">
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
          <q-btn class="q-ml-xs" dense round color="warning" size="md" icon="healing" @click="handleIgnore(props.row)">
            <q-tooltip>Ignore host</q-tooltip>
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
import { timeFormat } from '@/helpers/utils.js';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

const columns = [
  { name: 'name', align: 'left', field: 'id', sortable: true },
  {
    name: 'created',
    align: 'left',
    field: 'created',
    sortable: true,
    format: (val) => timeFormat(val),
  },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageAutoVpn',

  components: {
    UiBoxVue,
  },

  beforeRouteEnter(to, from) {
    if (from.path === '/proxy/ignorevpn') {
      return (vm) => {
        vm.getHosts();
      };
    }
  },

  setup() {
    const axios = inject('axios');
    const wrapper = useTableWrapper('/proxy/autovpn', axios);
    const confirm = useConfirmDialog();
    const spinner = ref(true);
    const rows = ref([]);
    const selected = ref([]);

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

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

      async getHosts() {
        rows.value = await wrapper.Get();
      },

      async handleIgnore(row) {
        const ok = await confirm.show('Are you sure to ignore this items?');
        if (ok) {
          const data = wrapper.Selected(row, selected.value);
          selected.value = [];
          rows.value = await wrapper.Ignore(rows.value, data);
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
