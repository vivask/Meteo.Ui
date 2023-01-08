<template>
  <ui-box-vue
    :columns="boxCols"
    header="Hosts Redirected to VPN"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[0, 10, 50, 100]">
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create host" @click="handleAdd" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit host" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete host" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-vpn-host-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import FormVpnHostVue from '../forms/FormVpnHost.vue';
import { createWrapper } from '../api/manualVpnApi';
import { useTableHandlers } from 'src/app/composables/useTableHandlers';
import UiRoundBtnVue from 'src/app/components/UiRoundBtn.vue';

const columns = [
  { name: 'name', align: 'left', field: 'name', sortable: true },
  {
    name: 'vpnlist',
  },
  { name: 'note', align: 'left', field: 'note', sortable: true },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageManualVpn',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormVpnHostVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const host = ref({});
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const form = ref(null);
    const visible = ref(false);

    const { handleAdd, handleEdit, handleSubmit, handleDelete, handleCancel } = useTableHandlers(
      visible,
      form,
      rows,
      wrapper,
      {},
    );

    onMounted(async () => {
      rows.value = await wrapper.Get();
    });

    return {
      columns,
      rows,
      host,
      buttonShow,
      form,
      boxCols,
      visible,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
      handleCancel,
    };
  },

  methods: {},
});
</script>
