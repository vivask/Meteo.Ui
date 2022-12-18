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
import { defineComponent, ref } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { timeFormat } from '@/helpers/utils.js';

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

      getSelected(row) {
        let data = selected.value;
        if (data.length == 0) {
          data.push(row);
        }
        return data;
      },
    };
  },

  mounted() {
    this.getHosts();
  },

  methods: {
    getHosts() {
      this.axios.get('/proxy/ignorevpn').then((response) => {
        this.rows = response.data.data;
        this.selected = [];
      });
    },

    async handleRestore(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to restore this items?',
      });
      if (ok) {
        this.spinner = true;
        const data = this.getSelected(row);
        this.axios.put('/proxy/ignorevpn', data).then(() => {
          this.getHosts();
        });
      }
    },

    async handleDelete(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to delete this item?',
      });
      if (ok) {
        this.spinner = true;
        const data = this.getSelected(row);
        this.axios.delete('/proxy/ignorevpn', data).then(() => {
          this.getHosts();
        });
      }
    },
  },
});
</script>
