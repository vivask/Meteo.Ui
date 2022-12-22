<template>
  <ui-box-vue
    :columns="boxCols"
    header="Schedule Management"
    :spinner="spinner"
    :buttonShow="buttonShow"
    buttonLabel="Add"
    :buttonClick="handleAdd"
  >
    <q-table hide-header dense :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 50, 100, 0]">
      <template #body-cell-state="props">
        <q-td :props="props" class="wd-70">
          <q-btn
            class="q-ml-xs"
            dense
            round
            :color="activeColor(props.row)"
            size="md"
            :icon="activeIcon(props.row)"
            @click="handleActivate(props.row)"
          >
            <q-tooltip>Activate/Deactivate job</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-job="props">
        <q-td :props="props">
          <q-card square flat>
            <q-card-section align="left">
              <div class="text-subtitle1 text-bold text-left text-primary">
                {{ props.row.note }}
              </div>
              <div v-if="props.row.period.id === 'once'" class="text-subtitle2 text-left">Execute one time</div>
              <div v-if="props.row.period.id !== 'once'" class="text-subtitle2 text-left">
                Repeate every{{ oneToEmpty(props.row.value) }}{{ props.row.period.name.toLowerCase() }}
              </div>
              <div v-if="isTimeOrDate(props.row.time, props.row.date)" class="text-subtitle2 text-left text-italic">
                Starting at {{ props.row.time }} {{ props.row.date }}
              </div>
            </q-card-section>
          </q-card>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round color="primary" size="md" icon="add" @click="handleAdd">
            <q-tooltip>Create new job</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="primary" size="md" icon="mdi-run" @click="handleRun(props.row)">
            <q-tooltip>Run job</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="handleEdit(props.row)">
            <q-tooltip>Edit job</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="handleDelete(props.row)">
            <q-tooltip>Delete job</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-job-vue ref="form" @submit="handleSubmit" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, inject } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useTableWrapper } from '@/composables/useTableWrapper.js';
import { useTableHandlers } from '@/composables/useTableHandlers';
import FormJobVue from '@/forms/FormJob.vue';

const columns = [{ name: 'state' }, { name: 'job' }, { name: 'actions' }];

export default defineComponent({
  name: 'PageJobs',

  components: {
    UiBoxVue,
    FormJobVue,
  },

  setup() {
    const axios = inject('axios');
    const wrapper = useTableWrapper('/schedule/jobs', axios);
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
        large: 4,
        medium: 7,
        small: 4,
      },

      activeIcon: (row) => (row.active ? 'alarm' : 'alarm_off'),

      activeColor: (row) => (row.active ? 'positive' : 'grey'),

      oneToEmpty: (val) => (val <= 1 ? ' ' : ' ' + val + ' '),

      isTimeOrDate: (time, date) => !!time?.length || !!date?.length,

      handleAdd,
      handleEdit,
      handleSubmit,
      handleDelete,

      handleActivate: (row) => {},
      handleRun: (row) => {},
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-70
  width: 70px
  max-width: 70px
</style>
