<template>
  <ui-box-vue
    :columns="boxCols"
    header="Authentication Radius"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table hide-header :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-20">
          <q-icon name="mdi-account-eye-outline" size="1.2rem" />
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd()" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Create user" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete user" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-auth-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import UiBoxVue from '@/shared/components/UiBox.vue';
import FormAuthVue from '../forms/FormAuth.vue';
import { createWrapper } from '../api/authApi';
import { useTableHandlers } from '@/shared/composables/useTableHandlers';
import UiRoundBtnVue from '@/shared/components/UiRoundBtn.vue';

const columns = [
  { name: 'state' },
  { name: 'username', align: 'left', field: 'username', sortable: true },
  { name: 'attribute', align: 'left', field: 'attribute' },
  { name: 'op', align: 'left', field: 'op' },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageAuth',

  components: {
    UiBoxVue,
    FormAuthVue,
    UiRoundBtnVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWrapper(rows);
    const form = ref(null);
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const visible = ref(false);
    const user = ref({});

    const { handleAdd, handleEdit, handleSubmit, handleDelete, handleCancel } = useTableHandlers(
      visible,
      form,
      rows,
      wrapper,
      {},
    );

    onMounted(async () => (rows.value = await wrapper.Get(true)));

    return {
      columns,
      rows,
      buttonShow,
      wrapper,
      form,
      boxCols,
      visible,
      user,

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
