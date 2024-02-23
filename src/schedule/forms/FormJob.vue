<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <q-checkbox v-model="localProp.verbose" label="Verbose" />
          <ui-input-vue v-model="localProp.note" hint="Job description *" />
          <q-select
            v-model="localProp.task"
            outlined
            dense
            :options="tasks"
            option-label="name"
            hint="Task *"
            lazy-rules
            :rules="[(val) => val || 'Please select something']"
          />
          <q-select
            v-model="localProp.executor"
            outlined
            dense
            :options="executors"
            option-label="name"
            hint="Executor *"
            lazy-rules
            :rules="[() => localProp.executor || 'Please select something']"
          />
          <div class="row">
            <div v-if="showValue" class="wd-70">
              <q-input ref="periodValue" v-model.number="localProp.value" type="number" outlined dense class="mr-5" />
            </div>
            <div :class="periodState">
              <q-select
                v-model="localProp.period"
                outlined
                dense
                :options="periods"
                option-label="name"
                hint="Period *"
                reactive-rules
                lazy-rules
                :rules="[(val) => val || 'Please select something']"
              />
            </div>
          </div>
          <q-input
            v-model="localProp.time"
            outlined
            dense
            type="time"
            step="2"
            hint="Start time"
            reactive-rules
            lazy-rules
            :rules="[
              (val) => validTime(val) || 'Please type time',
              (val) => moreThanNow(val, localProp.date, localProp.value) || 'Time has expired',
            ]"
          >
            <template #append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="localProp.time" mask="HH:mm:ss" format24h with-seconds>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="localProp.date"
            outlined
            dense
            type="date"
            hint="Start date"
            reactive-rules
            lazy-rules
            :rules="[
              (val) => validDate(val) || 'Incorrect date',
              (val) => moreThanNow(localProp.time, val, localProp.value) || 'Time has expired',
            ]"
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="localProp.date" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn
            dense
            :disable="paramsDisabled"
            class="wd-320"
            outline
            color="grey"
            :label="labelBtnParams"
            @click="showParams = !showParams"
          />
          <div v-if="showParams">
            <q-table hide-header hide-bottom :rows="localProp.params" :columns="columns" row-key="name">
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <ui-round-btn-vue color="primary" icon="add" tooltip="Create parameter" @click="handleAdd" />
                  <ui-round-btn-vue
                    color="positive"
                    icon="mode_edit"
                    tooltip="Edit parameter"
                    @click="handleEdit(props.row)"
                  />
                  <ui-round-btn-vue
                    color="negative"
                    icon="delete"
                    tooltip="Delete parameter"
                    @click="handleDelete(props.rowIndex)"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
          <div v-if="showBtnAddParam">
            <q-btn class="wd-320" dense label="Add" color="primary" @click="handleAdd()" />
          </div>
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="handleCancel" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <form-job-param-vue ref="form" @submit="handleParamSubmit" />
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted, nextTick } from 'vue';
import UiInputVue from '../../app/components/UiInput.vue';
import UiRoundBtnVue from '../../app/components/UiRoundBtn.vue';
import { useSubmitForm } from '../../app/composables/useSubmitForm';
import { useConfirmDialog } from '../../app/composables/useConfirmDialog.js';
import { useUtils } from '../../app/composables/useUtils';
import UiSelectVue from '../../app/components/UiSelect.vue';
import FormJobParamVue from './FormJobParam.vue';
import { Notify, date } from 'quasar';
import { getExecutors, getTasks, getPeriods } from '../api/formJobApi';

const columns = [
  {
    name: 'name',
    align: 'left',
    field: 'name',
    style: 'max-width: 40px; width: 40px;',
  },
  {
    name: 'value',
    align: 'left',
    field: 'value',
    style: 'font-style: italic; max-width: 70px; width: 70px;',
  },
  { name: 'job_id' },
  { name: 'actions' },
];

export default defineComponent({
  name: 'FormJob',

  components: {
    UiInputVue,
    UiRoundBtnVue,
    UiSelectVue,
    FormJobParamVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const form = ref(null);
    const showParams = ref(false);
    const labelBtnParams = computed(() => (showParams.value ? '<<' : '>>'));
    const { localProp, show, handleSubmit: formSubmit, handleCancel } = useSubmitForm(popup, emit);
    const confirm = useConfirmDialog();
    const showValue = ref(true);
    const paramsDisabled = ref(false);
    const executors = ref([]);
    const tasks = ref([]);
    const periods = ref([]);
    const periodValue = ref(null);
    let currentPeriod = null;
    const { isTime, isDate } = useUtils();

    watch(
      localProp,
      async (newVal, oldVal) => {
        showValue.value = newVal?.period ? newVal.period.id !== 'once' && newVal.period.id !== 'year' : false;
        paramsDisabled.value = !newVal?.task;
        await nextTick();
        if (oldVal && newVal?.period && periodValue?.value && newVal.period.id !== currentPeriod) {
          periodValue.value.focus();
          currentPeriod = newVal.period.id;
        }
      },
      { deep: true },
    );

    onMounted(async () => {
      executors.value = await getExecutors();
      tasks.value = await getTasks();
      periods.value = await getPeriods();
    });

    return {
      localProp,
      popup,
      form,
      columns,
      confirm,
      labelBtnParams,
      showValue,
      showParams,
      paramsDisabled,
      periodState: computed(() => (!showValue.value ? 'wd-320' : 'with-value')),
      executors,
      tasks,
      periods,
      periodValue,
      showBtnAddParam: computed(() =>
        showParams.value ? (localProp.value?.params ? localProp.value.params.length === 0 : true) : false,
      ),

      validTime: (v) =>
        localProp.value?.period && ['once', 'day', 'week', 'month', 'year'].includes(localProp.value.period.id)
          ? isTime(v)
          : !v || !v.length
          ? true
          : isTime(v),

      validDate: (v) =>
        localProp.value?.period && (localProp.value.period.id === 'month' || localProp.value.period.id === 'year')
          ? isDate(v)
          : !v || !v.length
          ? true
          : isDate(v),

      moreThanNow: (ts, ds, repeat) => {
        try {
          if (!ts || ts.length === 0 || !ds || ds.length === 0 || (repeat && repeat !== '0')) {
            return true;
          }
          const time = date.formatDate(ds + ' ' + ts, 'YYYY-MM-DD HH:mm:ss');
          return date.formatDate(time, 'X') > date.formatDate(new Date(), 'X');
        } catch (err) {
          console.log(err);
          return false;
        }
      },

      show,

      handleSubmit() {
        const valid =
          (localProp.value.task.params.length === 0 && !localProp.value?.params) ||
          (!!localProp.value?.params && localProp.value.params.length === localProp.value.task.params.length);

        if (!valid) {
          Notify.create({
            type: 'negative',
            message: 'The number of task and job parameters do not match!',
          });
          showParams.value = true;
        } else {
          formSubmit();
        }
      },

      handleCancel,

      handleAdd() {
        form.value.show({ row: {}, params: localProp.value.task.params });
      },

      handleEdit(row) {
        form.value.show({ row: row, params: localProp.value.task.params });
      },

      async handleDelete(id) {
        const ok = await confirm.show('Are you sure to delete this item?');
        if (ok) {
          if (id !== -1) {
            localProp.value.params.splice(id, 1);
          }
        }
      },

      handleParamSubmit(event) {
        if (!event.update) {
          if (!localProp.value?.params) {
            localProp.value.params = [];
          }
          localProp.value.params.push(event.data);
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
.with-value
  width: 250px
  max-width: 250px
.wd-320
  width: 320px
  max-width: 320px
.wd-max
  width: 100%
.mr-5
  margin-right: 5px
</style>
