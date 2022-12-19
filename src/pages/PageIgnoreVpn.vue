<template>
  <ui-box-vue :columns="boxCols" header="Hosts excluded from VPN">
    <ui-table-wrapper-vue ref="wrapper" api="/proxy/ignorevpn">
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
</template>

<script>
import { defineComponent, ref } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { timeFormat } from '@/helpers/utils.js';
import UiTableWrapperVue from '../components/UiTableWrapper.vue';

const columns = [
  { name: 'name', align: 'left', field: 'id', sortable: true },
  {
    name: 'updated',
    align: 'left',
    field: 'updated',
    sortable: true,
    format: (val) => timeFormat(val),
  },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageAutoVpn',

  components: {
    UiBoxVue,
    UiTableWrapperVue,
  },

  inject: ['confirm'],

  beforeRouteEnter(to, from) {
    if (from.path === '/proxy/autovpn') {
      return (vm) => {
        vm.getHosts();
      };
    }
  },

  setup() {
    const spinner = ref(true);
    const rows = ref([]);
    const selected = ref([]);

    return {
      spinner,
      columns,
      rows,
      selected,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },
    };
  },

  mounted() {
    this.getHosts();
  },

  methods: {
    async getHosts() {
      this.rows = await this.$refs.wrapper.get();
    },

    async handleRestore(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to restore this items?',
      });
      if (ok) {
        const data = this.$refs.wrapper.selected(row, this.selected);
        this.selected = [];
        this.rows = await this.$refs.wrapper.restore(this.rows, data);
      }
    },

    async handleDelete(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to delete this item?',
      });
      if (ok) {
        const data = this.$refs.wrapper.selected(row, this.selected);
        this.selected = [];
        this.rows = await this.$refs.wrapper.delete(this.rows, data);
      }
    },
  },
});
</script>
