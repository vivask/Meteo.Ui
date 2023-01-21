<template>
  <ui-box-vue
    :columns="boxCols"
    header="Tasks Management"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table hide-header dense :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-40">
          <q-icon name="task" size="2rem" />
        </q-td>
      </template>
      <template #body-cell-job="props">
        <q-td :props="props">
          <q-card square flat>
            <q-card-section align="left">
              <div class="text-subtitle1 text-bold text-primary">
                {{ props.row.name }}
              </div>
              <div class="text-subtitle2">{{ props.row.note }}</div>
            </q-card-section>
          </q-card>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create task" @click="handleAdd" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit task" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete task" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-task-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import UiRoundBtnVue from '../../app/components/UiRoundBtn.vue';
import { createWarapper } from '../api/tasksApi';
import { useTableHandlers } from '../../app/composables/useTableHandlers';
import FormTaskVue from '../forms/FormTask.vue';

const columns = [
  { name: 'state' },
  { name: 'id' },
  { name: 'job' },
  { name: 'note' },
  { name: 'params' },
  { name: 'actions' },
];

export default defineComponent({
  name: 'PageTasks',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormTaskVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWarapper(rows);
    const form = ref(null);
    const task = ref({});
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

    onMounted(async () => {
      rows.value = await wrapper.Get(true);
    });

    return {
      columns,
      rows,
      task,
      buttonShow,
      wrapper,
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
});
</script>

<style lang="sass" scoped>
.wd-40
  width: 40px
  max-width: 40px
</style>
