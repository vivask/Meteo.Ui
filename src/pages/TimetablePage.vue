<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Schedule Management</q-item-label>
            <q-space />
            <q-btn
            v-if="isShowHeaderButton"
            class="wd-100"
            dense
            color="primary"
            size="12px"
            label="Add"
            @click="createJob = true"
            />
        </q-item>
        <q-table
        hide-header
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-state="props">
            <q-td :props="props">
              <q-btn
              class="q-ml-xs"
              dense
              round
              :color="activeColor(props.row)"
              size="md"
              :icon="activeIcon(props.row)"
              @click="onActivate(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-job="props">
            <q-td :props="props">
              <q-card square flat>
                <q-card-section align="left">
                  <div class="text-subtitle1 text-bold job-name">{{props.row.name}}</div>
                  <div class="text-subtitle2">{{props.row.period_1}}</div>
                  <div class="text-subtitle2">{{props.row.period_2}}</div>
                </q-card-section>
              </q-card>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round color="primary" size="md" icon="add" @click="createJob = true" />
              <q-btn class="q-ml-xs" dense round color="primary" size="md" icon="mdi-run" @click="onRun(props.row)" />
              <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="onEdit(props.row)" />
              <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="onDelete(props.row)" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <q-dialog v-model="createJob" transition-show="rotate" transition-hide="rotate">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form
          @submit="onSubmit(createJob)"
          class="q-gutter-md"
        >
          <q-input
          outlined
          v-model="name"
          hint="Job description *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-select
          outlined
          v-model="task"
          :options="tasks"
          hint="Task *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-select
          outlined
          v-model="executor"
          :options="executors"
          hint="Executor *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div class="row">
            <div
            class="wd-50"
            v-if="isShowValue"
            >
              <q-input
              outlined
              v-model="value"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
              />
            </div>
            <div
            class="wd-100 ml-10"
            v-if="isShowDays"
            >
              <q-select
              outlined
              v-model="day"
              :options="days"
              hint="Day *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
            <div
            :class="periodState"
            >
              <q-select
              outlined
              v-model="period"
              :options="periods"
              hint="Period *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              @update:model-value="val => onPeriodChange(val)"
              />
            </div>
          </div>
          <q-input
          outlined
          v-model="time"
          type="time"
          step="2"
          :disable="disabled"
          hint="Start time"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="time" mask="HH:mm:ss" format24h with-seconds>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
          outlined
          v-model="date"
          type="date"
          :disable="disabled"
          hint="Start date"
          >
          <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn
          dense=""
          class="wd-310"
          outline
          color="grey"
          :label="labelBtnParams"
          @click="onParams()"
          />
          <div v-if="showParams">
            <q-table
            hide-header
            hide-bottom
            :rows="params"
            :columns="scheme"
            row-key="name"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense round color="primary" size="md" icon="add" @click="createParam = true" />
                  <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="onEditParam(props.row)" />
                  <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="onDeleteParam(props.row)" />
                </q-td>
              </template>
            </q-table>
          </div>
          <div v-if="showBtnAddParam">
            <q-btn
            class="wd-310"
            dense
            label="Add"
            color="primary"
            @click="createParam = true"
            />
          </div>
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="createParam" transition-show="rotate" transition-hide="rotate">
    <q-card style="min-width: 300px">
      <q-card-section>
        <q-form
          @submit="onSubmitParam(createParam)"
          class="q-gutter-md"
        >
        <q-input
            v-model="paramName"
            outlined
            hint="Parameter name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="paramValue"
            outlined
            hint="Parameter value *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


const columns = [
  { name: 'state' },
  { name: 'job' },
  { name: 'actions' },
]

const rows = [
  {
    active: false,
    name: 'ByFly PPP check time',
    period_1: 'Повторять каждый час',
    period_2: ''
  },
  {
    active: true,
    name: 'Sync ESP32 tables',
    period_1: 'Повторять каждый день ',
    period_2: 'Начиная с 02:30:00 '
  }
]

const scheme = [
  { name: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'value', align: 'left', field: 'value', sortable: true  },
  { name: 'actions' },
]

const params = [
  {
    name: 'msg',
    value: 'message'
  }
]

export default {
  setup () {

    const $q = useQuasar()

    const name = ref(null)
    const task = ref(null)
    const executor = ref(null)
    const value = ref(null)
    const day = ref(null)
    const period = ref(null)
    const isShowValue = ref(false)
    const isShowDays = ref(false)
    const time = ref(null)
    const date = ref(null)
    const labelBtnParams = ref('>>')
    const paramName = ref(null)
    const paramValue = ref(null)
    const disabled = ref(false)

    return {
      createJob: ref(false),
      columns,
      rows,
      name,
      task,
      tasks: ['Telegramm msanger'],
      executor,
      executors: ['All', 'Leader', 'Master', 'Slave'],
      value,
      day,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      period,
      periods: ['Once', 'Second', 'Minute', 'Hour', 'Day', 'Week', 'Day of week', 'Month', 'Year'],
      isShowHeaderButton: computed(() => (rows.length===0)),
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 6}`),
      isShowValue,
      isShowDays,
      periodState: computed(() => (isShowValue.value==false && isShowDays.value==false) ? 'wd-max' :
                                  (isShowValue.value==true && isShowDays.value==false) ? 'wd-260 ml-10' : 'wd-150 ml-10'),
      time,
      date,
      labelBtnParams,
      scheme,
      params,
      showParams: computed(() => (labelBtnParams.value==='<<' && params.length!=0)),
      showBtnAddParam: computed(() => (labelBtnParams.value==='<<' && params.length==0)),
      createParam: ref(false),
      paramName,
      paramValue,
      disabled,
      onActivate (row) {
        console.log(row)
      },
      onRun (row) {
        console.log(row)
      },
      onEdit (row) {
        console.log(row)
      },
      onDelete (row) {
        console.log(row)
      },
      activeIcon (row) {
        return (row.active) ? "alarm" : "alarm_off"
      },
      activeColor (row) {
        return (row.active) ? "positive" : "grey"
      },
      onSubmit (dlg) {
        this.createJob = false
      },
      onPeriodChange (val) {
        switch (val) {
          case 'Once':
            isShowValue.value = false
            isShowDays.value = false
            disabled.value = true
            break
          case 'Second':
          case 'Minute':
          case 'Hour':
          case 'Day':
          case 'Week':
          case 'Month':
          case 'Year':
            isShowValue.value = true
            isShowDays.value = false
            disabled.value = false
            break
          case 'Day of week':
            isShowValue.value = true
            isShowDays.value = true
            disabled.value = false
            break
          default:
            console.log("Unknown period: ",val)
        }
      },
      onParams () {
        if(labelBtnParams.value == '>>'){
          labelBtnParams.value = '<<'
        }else{
          labelBtnParams.value = '>>'
        }
      },
      onSubmitParam (dlg) {
        this.createParam = false
      },
    }
  },
  methods: {
  }

}
</script>

<style lang="sass" scoped>
  .bot-line
    border-bottom: 1px solid rgba(86, 61, 124, .2)
  .crisper
    .square
      margin: 5px
      background: rgba(86, 61, 124, .15)
      border: 1px solid rgba(86, 61, 124, .2)
  .job-name
    color: #1976D2
  .right
    margin-left: auto
</style>
