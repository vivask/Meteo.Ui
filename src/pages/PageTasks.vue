<template>
  <ui-box-vue
    :columns="boxCols"
    header="Tasks Management"
    :spinner="spinner"
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
  </ui-box-vue>

  <form-task-vue ref="form" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useTableHandlers } from '@/composables/useTableHandlers';
import FormTaskVue from '@/forms/FormTask.vue';

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
    FormTaskVue,
  },

  setup() {
    const axios = inject('axios');
    const wrapper = useTableWrapper('/schedule/tasks', axios);
    const spinner = ref(true);
    const form = ref(null);
    const rows = ref([]);
    const task = ref({});
    const buttonShow = computed(() => rows.value.length === 0);

    const { handleAdd, handleEdit, handleSubmit, handleDelete } = useTableHandlers(form, rows, wrapper, {});

    onMounted(async () => {
      rows.value = await wrapper.Get();
    });

    return {
      spinner,
      columns,
      rows,
      task,
      buttonShow,
      wrapper,
      form,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-40
  width: 40px
  max-width: 40px
</style>
