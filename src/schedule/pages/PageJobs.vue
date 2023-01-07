<template>
  <ui-box-vue
    :columns="boxCols"
    header="Schedule Management"
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
          <ui-round-btn-vue color="primary" icon="add" tooltip="Create job" @click="handleAdd" />
          <ui-round-btn-vue color="primary" icon="mdi-run" tooltip="Run job" @click="handleRun(props.row)" />
          <ui-round-btn-vue color="positive" icon="mode_edit" tooltip="Edit job" @click="handleEdit(props.row)" />
          <ui-round-btn-vue color="negative" icon="delete" tooltip="Delete job" @click="handleDelete(props.row)" />
        </q-td>
      </template>
    </q-table>
  </ui-box-vue>

  <form-job-vue v-if="visible" ref="form" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, onActivated } from 'vue';
import UiBoxVue from '@/shared/components/UiBox.vue';
import UiRoundBtnVue from '@/shared/components/UiRoundBtn.vue';
import { createWarapper, createJob, updateJob, toggleJob, runJob } from '../api/jobsApi';
import { useTableHandlers } from '@/shared/composables/useTableHandlers';
import FormJobVue from '../forms/FormJob.vue';
import { Notify } from 'quasar';

const columns = [{ name: 'state' }, { name: 'job' }, { name: 'actions' }];

export default defineComponent({
  name: 'PageJobs',

  components: {
    UiBoxVue,
    UiRoundBtnVue,
    FormJobVue,
  },

  setup() {
    const rows = ref([]);
    const wrapper = createWarapper(rows);
    const form = ref(null);
    const task = ref({});
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const buttonShow = computed(() => rows.value.length === 0);
    const visible = ref(false);

    const { handleAdd, handleEdit, handleDelete, handleCancel } = useTableHandlers(visible, form, rows, wrapper, {
      verbose: false,
    });

    onMounted(async () => (rows.value = await wrapper.Get(true)));
    onActivated(async () => (rows.value = await wrapper.Get(false)));

    return {
      columns,
      rows,
      task,
      buttonShow,
      wrapper,
      form,
      boxCols,
      visible,

      activeIcon: (row) => (row.active ? 'alarm' : 'alarm_off'),

      activeColor: (row) => (row.active ? 'positive' : 'grey'),

      oneToEmpty: (val) => (val <= 1 ? ' ' : ' ' + val + ' '),

      isTimeOrDate: (time, date) => !!time?.length || !!date?.length,

      handleAdd,
      handleEdit,

      handleSubmit(event) {
        if (event.update) {
          updateJob(rows, event.data);
        } else {
          createJob(rows, event.data);
        }
      },

      handleDelete,
      handleCancel,

      handleActivate: (row) => {
        toggleJob(row);
      },

      handleRun: async (row) => {
        const ok = await runJob(row.id);
        if (ok) {
          Notify.create({
            type: 'info',
            message: 'Job completed',
          });
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-70
  width: 70px
  max-width: 70px
</style>
