<template>
  <ui-box-vue :columns="boxCols" header="Hosts Redirected to VPN">
    <ui-table-wrapper-vue ref="wrapper" api="/proxy/autovpn">
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
              color="warning"
              size="md"
              icon="healing"
              @click="handleIgnore(props.row)"
            >
              <q-tooltip>Ignore host</q-tooltip>
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
    UiTableWrapperVue,
  },

  inject: ['confirm'],

  beforeRouteEnter(to, from) {
    if (from.path === '/proxy/ignorevpn') {
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

    async handleIgnore(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to ignore this items?',
      });
      if (ok) {
        const data = this.$refs.wrapper.selected(row, this.selected);
        this.selected = [];
        this.rows = await this.$refs.wrapper.ignore(this.rows, data);
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
