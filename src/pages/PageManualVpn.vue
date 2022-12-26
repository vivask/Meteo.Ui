<template>
  <ui-box-vue
    :spinner="spinner"
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

  <form-vpn-host-vue ref="form" :list="list" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, inject, onMounted } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import FormVpnHostVue from '@/forms/FormVpnHost.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useTableHandlers } from '@/composables/useTableHandlers';

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
    FormVpnHostVue,
  },

  setup() {
    const axios = inject('axios');
    const rows = ref([]);
    const wrapper = useTableWrapper('/proxy/manualvpn', axios, rows);
    const spinner = ref(true);
    const list = ref([]);
    const host = ref({});
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const form = ref(null);

    const { handleAdd, handleEdit, handleSubmit, handleDelete } = useTableHandlers(form, rows, wrapper, {
      list: { id: null },
    });

    onMounted(async () => {
      axios.get('/proxy/vpnlists').then(async (response) => {
        list.value = response.data.data;
        rows.value = await wrapper.Get();
        spinner.value = false;
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
      boxCols,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
    };
  },

  methods: {},
});
</script>
