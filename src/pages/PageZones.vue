<template>
  <ui-box-vue
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
          <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="handleEdit(props.row)">
            <q-tooltip>Create zone</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="handleDelete(props.row)">
            <q-tooltip>Delete zone</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-zone-vue ref="form" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import FormZoneVue from '@/forms/FormZone.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useTableHandlers } from '@/composables/useTableHandlers';

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
    FormZoneVue,
  },

  setup() {
    const axios = inject('axios');
    const wrapper = useTableWrapper('/proxy/zones', axios);
    const spinner = ref(true);
    const form = ref(null);
    const rows = ref([]);
    const zone = ref({});
    const buttonShow = computed(() => rows.value.length === 0);

    const { handleAdd, handleEdit, handleSubmit, handleDelete } = useTableHandlers(form, rows, wrapper, {});

    onMounted(async () => {
      rows.value = await wrapper.Get();
    });

    return {
      spinner,
      columns,
      rows,
      zone,
      buttonShow,
      wrapper,
      form,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

      activeIcon: (row) => (row.active ? 'task_alt' : 'highlight_off'),

      activeColor: (row) => (row.active ? 'positive' : 'grey'),

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
    };
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
