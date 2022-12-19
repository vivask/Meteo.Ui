<template>
  <ui-box-vue
    :columns="boxCols"
    header="Hosts Redirected to VPN"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <ui-table-wrapper-vue ref="wrapper" api="/proxy/manualvpn">
      <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd"></q-btn>
            <q-btn
              class="q-ml-xs"
              dense
              round
              color="positive"
              size="md"
              icon="mode_edit"
              @click="handleEdit(props.row)"
            >
              <q-tooltip>Create host</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-xs"
              dense
              round
              color="negative"
              size="md"
              icon="delete"
              @click="handleDelete(props.row)"
            >
              <q-tooltip>Delete host</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </ui-table-wrapper-vue>
  </ui-box-vue>

  <vpn-host-form-vue ref="form" :host="host" :list="list" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import VpnHostFormVue from '@/components/VpnHostForm.vue';
import UiTableWrapperVue from '../components/UiTableWrapper.vue';

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
    UiTableWrapperVue,
  },

  inject: ['confirm'],

  setup() {
    const spinner = ref(true);
    const rows = ref([]);
    const list = ref([]);
    const host = ref({});
    const buttonShow = computed(() => rows.value.length === 0);

    return {
      spinner,
      columns,
      rows,
      list,
      host,
      buttonShow,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },
    };
  },

  mounted() {
    this.getLists();
  },

  methods: {
    getLists() {
      this.axios.get('/proxy/vpnlists').then(async (response) => {
        this.list = response.data.data;
        this.rows = await this.$refs.wrapper.get();
      });
    },

    handleAdd() {
      this.host = { list: { id: null } };
      this.$refs.form.show();
    },

    handleEdit(row) {
      this.host = row;
      this.$refs.form.show();
    },

    async handleSubmit(event) {
      if (event.update) {
        this.rows = await this.$refs.wrapper.update(this.rows, event.data);
      } else {
        this.rows = await this.$refs.wrapper.insert(this.rows, event.data);
      }
    },

    async handleDelete(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to delete this item?',
      });
      if (ok) {
        this.rows = await this.$refs.wrapper.delete(this.rows, row);
      }
    },
  },
});
</script>
