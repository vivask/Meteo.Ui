<template>
  <ui-box-vue
    :columns="boxCols"
    header="Local hosts"
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
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create zone" @click="handleAdd" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit zone" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete zone" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-zone-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import UiBoxVue from '@/shared/components/UiBox.vue';
import FormZoneVue from '../forms/FormZone.vue';
import { zonesApi } from '../api/zonesApi';
import { useTableHandlers } from '@/shared/composables/useTableHandlers';
import { useUtils } from '@/shared/composables/useUtils.js';
import UiRoundBtnVue from '@/shared/components/UiRoundBtn.vue';

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
    UiRoundBtnVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = zonesApi(rows);
    const form = ref(null);
    const zone = ref({});
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
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
      rows.value = await wrapper.Get(true);
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
