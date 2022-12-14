<template>
  <UiBoxVue :columns="cols" header="Local hosts" :spinner="spinner">
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template v-slot:body-cell-state="props">
        <q-td :props="props" class="wd-30">
          <q-icon :name="activeIcon(props.row)" size="1.2rem" :color="activeColor(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd()" />
          <q-btn
            class="q-ml-xs"
            dense
            round
            color="positive"
            size="md"
            icon="mode_edit"
            @click="handleEdit(props.row)"
          />
          <q-btn
            class="q-ml-xs"
            dense
            round
            color="negative"
            size="md"
            icon="delete"
            @click="handleDelete(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </UiBoxVue>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import UiBoxVue from '@/components/UiBox.vue';

const columns = [
  { name: 'state' },
  { name: 'address', align: 'left', field: 'address', sortable: true },
  { name: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'mac', align: 'left', field: 'mac', sortable: true },
  { name: 'note', align: 'left', field: 'note', sortable: true },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageZones',

  components: {
    UiBoxVue,
  },

  setup() {
    const $q = useQuasar();

    const rows = ref([]);

    return {
      spinner: ref(true),

      columns,

      rows,

      zone: ref({}),

      isShowHeaderButton: computed(() => rows.length === 0),

      cols: computed(() => `col-${$q.screen.name == 'sm' ? 8 : $q.screen.name == 'xs' ? 11 : 5}`),

      GetZones() {
        this.axios.get('/proxy/zones/get').then((response) => {
          this.rows = response.data.data;
          this.spinner = false;
        });
      },

      activeIcon(row) {
        return row.active ? 'task_alt' : 'highlight_off';
      },

      activeColor(row) {
        return row.active ? 'positive' : 'grey';
      },
    };
  },

  methods: {},

  mounted() {
    this.GetZones();
  },
});
</script>

<style lang="sass" scoped>
.wd-30
  width: 30px
  max-width: 30px
.wd-100
  width: 100px
  max-width: 100px
</style>
