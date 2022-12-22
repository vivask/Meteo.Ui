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
            :rules="[() => localProp.task || 'Please select something']"
            @update:model-value="(val) => (paramsDisabled = val)"
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
            <div v-if="showValue" class="wd-50">
              <q-input v-model="localProp.value" outlined dense />
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
                :rules="[() => localProp.period || 'Please select something']"
                @update:model-value="(val) => (showValue = val !== 'once')"
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
              (val) => checkDate(val) || 'Incorrect date',
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
            <q-table hide-header hide-bottom :rows="params" :columns="columns" row-key="name">
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
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted, inject } from 'vue';
import UiInputVue from '@/components/UiInput.vue';
import { useSubmitForm } from '@/composables/useSubmitForm';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';
import { isTime, isDate } from '@/helpers/utils.js';
import { date } from 'quasar';

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
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const axios = inject('axios');
    const popup = ref(null);
    const form = ref(null);
    const showParams = ref(false);
    const labelBtnParams = computed(() => (showParams.value ? '<<' : '>>'));
    const { localProp, show, handleSubmit, handleCancel } = useSubmitForm(popup, emit);
    const confirm = useConfirmDialog();
    const showValue = ref(true);
    const paramsDisabled = ref(false);
    const executors = ref([]);
    const tasks = ref([]);
    const periods = ref([]);

    /*watch(
      localProp['period'],
      (newVal) => {
        showValue.value = newVal !== 'once';
      },
      { immediate: true },
    );*/

    onMounted(async () => {
      axios.get('/schedule/executors').then(async (response) => {
        executors.value = response.data.data;
      });
      axios.get('/schedule/tasks').then(async (response) => {
        tasks.value = response.data.data;
      });
      axios.get('/schedule/periods').then(async (response) => {
        periods.value = response.data.data;
      });
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
      periodState: computed(() => (!showValue.value ? 'wd-max' : 'wd-260 ml-10')),
      executors,
      tasks,
      periods,
      showBtnAddParam: computed(() =>
        showParams.value ? (localProp.value?.params ? localProp.value.params.length === 0 : true) : false,
      ),

      validTime: (v) => {
        return ['once', 'day', 'week', 'month', 'year'].includes(localProp.value.period.id)
          ? isTime(v)
          : !v || !v.length
          ? true
          : isTime(v);
      },

      validDate: (v) => {
        const period = localProp.value.period.id;
        return period === 'month' || period === 'year' ? isDate(v) : !v || !v.length ? true : isDate(v);
      },

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
      handleSubmit,
      handleCancel,

      handleAdd() {
        form.value.show({});
      },

      handleEdit(row) {
        form.value.show(row);
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
.wd-50
  width: 50px
  max-width: 50px
.wd-260
  width: 260px
  max-width: 260px
.wd-320
  width: 320px
  max-width: 320px
.wd-max
  width: 100%
.ml-10
  margin-left: 10
</style>
