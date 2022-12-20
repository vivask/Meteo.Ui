<template>
  <ui-box-vue
    :columns="boxCols"
    header="Hosts Redirected to VPN"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd"></q-btn>
          <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="handleEdit(props.row)">
            <q-tooltip>Create host</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="handleDelete(props.row)">
            <q-tooltip>Delete host</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <vpn-host-form-vue ref="form" :host="host" :list="list" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, inject, onMounted } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import VpnHostFormVue from '@/components/VpnHostForm.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

const columns = [
  { name: 'name', align: 'left', field: 'name', sortable: true },
  {
    name: 'vpnlist',
    align: 'left',
    field: (row) => row.list.id,
    sortable: true,
  },
  { name: 'note', align: 'left', field: 'note', sortable: true },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageManualVpn',

  components: {
    UiBoxVue,
    VpnHostFormVue,
  },

  setup() {
    const axios = inject('axios');
    const wrapper = useTableWrapper('/proxy/manualvpn', axios);
    const confirm = useConfirmDialog();
    const spinner = ref(true);
    const rows = ref([]);
    const list = ref([]);
    const host = ref({});
    const buttonShow = computed(() => rows.value.length === 0);
    const form = ref(null);

    onMounted(async () => {
      axios.get('/proxy/vpnlists').then(async (response) => {
        list.value = response.data.data;
        rows.value = await wrapper.Get();
      });
    });

    return {
      spinner,
      columns,
      rows,
      list,
      host,
      buttonShow,
      form,
      confirm,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

      handleAdd() {
        host.value = { list: { id: null } };
        form.value.show();
      },

      handleEdit(row) {
        host.value = row;
        form.value.show();
      },

      async handleSubmit(event) {
        if (event.update) {
          rows.value = await wrapper.Update(rows.value, event.data);
        } else {
          rows.value = await wrapper.Insert(rows.value, event.data);
        }
      },

      async handleDelete(row) {
        const ok = await confirm.show('Are you sure to delete this item?');
        if (ok) {
          rows.value = await wrapper.Delete(rows.value, row);
        }
      },
    };
  },
});
</script>
