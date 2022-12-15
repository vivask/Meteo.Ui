<template>
  <UiBoxVue
    :columns="boxCols"
    header="Local hosts"
    :spinner="spinner"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
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

  <ZoneFormVue v-if="viewForm" v-model="viewForm" :zone="zone" @submit="handleSubmit" />
  <ui-confirm-vue ref="confirm" />
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import ZoneFormVue from '@/components/ZoneForm.vue';
import UiConfirmVue from '@/components/UiConfirm.vue';

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
    ZoneFormVue,
    UiConfirmVue,
  },

  setup() {
    const rows = ref([]);

    const buttonShow = computed(() => rows.value.length === 0);

    return {
      spinner: ref(true),

      columns,

      rows,

      zone: ref({
        name: null,
        address: null,
        mac: null,
        note: null,
      }),

      viewForm: ref(false),

      viewConfirm: ref(false),

      actionEdit: false,

      buttonShow,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

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

  mounted() {
    this.GetZones();
  },

  methods: {
    handleAdd() {
      Object.keys(this.zone).forEach((key) => {
        this.zone[key] = null;
      });
      this.viewForm = true;
      this.actionEdit = false;
    },

    handleEdit(row) {
      this.zone = row;
      this.viewForm = true;
      this.actionEdit = true;
    },

    async handleDelete(row) {
      this.viewConfirm = true;
      const ok = await this.$refs.confirm.show({
        message: 'Are you sure to delete this item?',
      });
      if (ok) {
        const url = '/proxy/zones/' + row.id;
        this.axios.delete(url).then(() => {
          this.GetZones();
        });
      }
      this.viewConfirm = false;
    },

    handleSubmit(zone) {
      if (this.actionEdit) {
        this.axios.post('/proxy/zones/edit', zone).then(() => {
          this.GetZones();
        });
      } else {
        this.axios.post('/proxy/zones/add', zone).then(() => {
          this.GetZones();
        });
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
