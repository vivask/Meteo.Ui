<template>
  <ui-box-vue
    :columns="boxCols"
    header="Local hosts"
    :spinner="spinner"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <ui-table-wrapper-vue ref="wrapper" api="/proxy/zones">
      <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
        <template #body-cell-state="props">
          <q-td :props="props" class="wd-30">
            <q-icon :name="activeIcon(props.row)" size="1.2rem" :color="activeColor(props.row)" />
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd" />
            <q-btn
              class="q-ml-xs"
              dense
              round
              color="positive"
              size="md"
              icon="mode_edit"
              @click="handleEdit(props.row)"
            >
              <q-tooltip>Create zone</q-tooltip>
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
              <q-tooltip>Delete zone</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </ui-table-wrapper-vue>
  </ui-box-vue>

  <zone-form-vue ref="form" :zone="zone" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import ZoneFormVue from '@/components/ZoneForm.vue';
import UiTableWrapperVue from '../components/UiTableWrapper.vue';

const columns = [
  { name: 'state' },
  { name: 'address', align: 'left', field: 'address', sortable: true },
  { name: 'name', align: 'left', field: 'name' },
  { name: 'mac', align: 'left', field: 'mac' },
  { name: 'note', align: 'left', field: 'note' },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageZones',

  components: {
    UiBoxVue,
    ZoneFormVue,
    UiTableWrapperVue,
  },

  inject: ['confirm'],

  setup() {
    const spinner = ref(true);
    const rows = ref([]);
    const zone = ref({});
    const buttonShow = computed(() => rows.value.length === 0);

    return {
      spinner,
      columns,
      rows,
      zone,
      buttonShow,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

      activeIcon(row) {
        return row.active ? 'task_alt' : 'highlight_off';
      },

      activeColor(row) {
        return row.active ? 'positive' : 'grey';
      },
    };
  },

  async mounted() {
    this.rows = await this.$refs.wrapper.get();
  },

  methods: {
    handleAdd() {
      this.zone = {};
      this.$refs.form.show();
    },

    handleEdit(row) {
      this.zone = row;
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

<style lang="sass" scoped>
.wd-30
  width: 30px
  max-width: 30px
.wd-100
  width: 100px
  max-width: 100px
</style>
