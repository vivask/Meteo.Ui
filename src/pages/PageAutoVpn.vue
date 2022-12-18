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
import { defineComponent, ref, computed } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { timeFormat } from '@/helpers/util.js';

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

  inject: ['confirm'],

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
        let data = [];
        if (selected.value.length == 0) {
          data.push(row);
        } else {
          data = selected.value;
        }
        return data;
      },
    };
  },

  mounted() {
    this.getLists();
  },

  methods: {
    getHosts() {
      this.axios.get('/proxy/autovpn').then((response) => {
        this.rows = response.data.data;
      });
    },

    async handleIgnore(row) {
      const ok = await this.confirm.show({
        message: 'Are you sure to ignore this items?',
      });
      if (ok) {
        this.spinner = true;
        const data = this.getSelected(row);
        this.axios.put('/proxy/autovpn', data).then(() => {
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
        this.axios.delete('/proxy/autovpn', data).then(() => {
          this.getHosts();
        });
      }
    },
  },
});
</script>
