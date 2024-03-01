<template>
  <ui-box-vue
    :columns="boxCols"
    header="Коммунальные расходы"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[0, 10, 50, 100]" dense>
      <template #body-cell-date="props">
        <q-td :props="props" class="wd-80">
          <div class="text-left text-primary">
            {{ getDate(props.row.created_at) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create" @click="handleAdd" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-communal-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import { useTableHandlers } from '../../app/composables/useTableHandlers';
import { createWrapper, getCommunal } from '../api/communalApi';
import { useUtils } from '../../app/composables/useUtils.js';
import UiRoundBtnVue from '../../app/components/UiRoundBtn.vue';
import FormCommunalVue from '../forms/FormCommunal.vue';

const columns = [
  { name: 'date', label: 'Дата', align: 'left' },
  { name: 'elec_c', label: 'Расход электр.', align: 'left', field: 'elec_consumption' },
  { name: 'elec_p', label: 'Оплачено электр.', align: 'left', field: 'elec_paid' },
  { name: 'gas_c', label: 'Расход газа', align: 'left', field: 'gas_consumption' },
  { name: 'gas_p', label: 'Оплачено газ', align: 'left', field: 'gas_paid' },
  { name: 'water_c', label: 'Расход вода', align: 'left', field: 'water_consumption' },
  { name: 'water_p', label: 'Оплачено вода', align: 'left', field: 'water_paid' },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageCommunals',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormCommunalVue,
  },

  setup() {
    const rows = ref([]);
    const form = ref(null);
    const wrapper = createWrapper(rows);
    const zone = ref({});
    const boxCols = { xl: 6, lg: 7, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const visible = ref(false);

    const { handleAdd, handleEdit, handleSubmit, handleDelete, handleCancel } = useTableHandlers(
      visible,
      form,
      rows,
      wrapper,
      {},
    );

    const { activeIcon, activeColor } = useUtils();

    onMounted(async () => {
      rows.value = await getCommunal();
    });

    return {
      columns,
      rows,
      zone,
      buttonShow,
      form,
      boxCols,
      visible,

      activeIcon,
      activeColor,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
      handleCancel,

      getDate(created_at) {
        const d = new Date(created_at);
        return d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear();
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-80
  width: 80px
  max-width: 80px
</style>
