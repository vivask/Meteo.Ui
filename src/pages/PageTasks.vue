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
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

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
  },

  setup() {
    const axios = inject('axios');
    const wrapper = useTableWrapper('/schedule/tasks', axios);
    const confirm = useConfirmDialog();
    const spinner = ref(true);
    const form = ref(null);
    const rows = ref([]);
    const task = ref({});
    const buttonShow = computed(() => rows.value.length === 0);

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
      confirm,

      boxCols: {
        large: 5,
        medium: 7,
        small: 5,
      },

      handleAdd() {
        task.value = {};
        form.value.show();
      },

      handleEdit(row) {
        task.value = row;
        form.value.show();
      },

      async handleSubmit(event) {
        if (event.update) {
          rows.value = await wrapper.Update(rows.value, event.data);
        } else {
          rows.value = await wrapper.Insert(rows.value, event.data);
        }
      },

      async handleDelete(row) {
        const ok = await confirm.show('Are you sure to delete this item?');
        if (ok) {
          rows.value = await wrapper.Delete(rows.value, row);
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-40
  width: 40px
  max-width: 40px
</style>
