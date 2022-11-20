<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Schedule Management</q-item-label
          >
          <q-space />
          <q-btn
            v-if="isShowHeaderButton"
            class="wd-100"
            dense
            color="primary"
            size="12px"
            label="Add"
            @click="onAdd()"
          >
            <q-tooltip>Create new job</q-tooltip>
          </q-btn>
        </q-item>
        <q-table
          hide-header
          :rows="rows"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-state="props">
            <q-td :props="props" class="wd-40">
              <q-btn
                class="q-ml-xs"
                dense
                round
                :color="activeColor(props.row)"
                size="md"
                :icon="activeIcon(props.row)"
                @click="onActivate(props.row)"
              >
                <q-tooltip>Activate/Deactivate job</q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-job="props">
            <q-td :props="props">
              <q-card square flat>
                <q-card-section align="left">
                  <div class="text-subtitle1 text-bold text-left text-primary">
                    {{ props.row.note }}
                  </div>
                  <div
                    class="text-subtitle2 text-left"
                    v-if="isOncePeriod(props.row.period.id)"
                  >
                    Execute one time
                  </div>
                  <div
                    class="text-subtitle2 text-left"
                    v-if="isRegularPeriod(props.row.period.id)"
                  >
                    Repeate every{{ this.oneToEmpty(props.row.value)
                    }}{{ props.row.period.name.toLowerCase() }}
                  </div>
                  <div
                    class="text-subtitle2 text-left text-italic"
                    v-if="isTimeOrDate(props.row.time, props.row.date)"
                  >
                    Starting at {{ props.row.time }} {{ props.row.date }}
                  </div>
                </q-card-section>
              </q-card>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                round
                color="primary"
                size="md"
                icon="add"
                @click="onAdd()"
              >
                <q-tooltip>Create new job</q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="primary"
                size="md"
                icon="mdi-run"
                @click="onRun(props.row)"
              >
                <q-tooltip>Run job</q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="positive"
                size="md"
                icon="mode_edit"
                @click="onEdit(props.row)"
              >
                <q-tooltip>Edit job</q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="negative"
                size="md"
                icon="delete"
                @click="onDelete(props.row)"
              >
                <q-tooltip>Delete job</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <q-dialog
    v-model="createJob"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form @submit="onSubmit(createJob)" class="q-gutter-md">
          <q-checkbox v-model="job.verbose" label="Verbose" />
          <q-input
            outlined
            dense
            v-model="job.note"
            hint="Job description *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-select
            outlined
            dense
            v-model="job.task"
            :options="tasks"
            option-label="name"
            hint="Task *"
            lazy-rules
            :rules="[() => job.task || 'Please select something']"
            @update:model-value="(val) => onTaskParamSelect(val)"
          />
          <q-select
            outlined
            dense
            v-model="job.executor"
            :options="executors"
            option-label="name"
            hint="Executor *"
            lazy-rules
            :rules="[() => job.executor || 'Please select something']"
          />
          <div class="row">
            <div class="wd-50" v-if="isShowValue">
              <q-input outlined dense v-model="job.value" />
            </div>
            <div :class="periodState">
              <q-select
                outlined
                dense
                v-model="job.period"
                :options="periods"
                option-label="name"
                hint="Period *"
                reactive-rules
                lazy-rules
                :rules="[() => job.period || 'Please select something']"
                @update:model-value="(val) => onPeriodChange(val)"
              />
            </div>
          </div>
          <q-input
            outlined
            dense
            v-model="job.time"
            type="time"
            step="2"
            hint="Start time"
            reactive-rules
            lazy-rules
            :rules="[
              (val) => checkTime(job.period.id, val) || 'Please type time',
              (val) =>
                moreThanNow(val, job.date, job.value) || 'Time has expired',
            ]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="job.time"
                    mask="HH:mm:ss"
                    format24h
                    with-seconds
                  >
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
            dense
            v-model="job.date"
            type="date"
            hint="Start date"
            reactive-rules
            lazy-rules
            :rules="[
              (val) => checkDate(job.period.id, val) || 'Incorrect date',
              (val) =>
                moreThanNow(job.time, val, job.value) || 'Time has expired',
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="job.date" mask="YYYY-MM-DD">
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
                  <q-btn
                    dense
                    round
                    color="primary"
                    size="md"
                    icon="add"
                    @click="onAddParam()"
                  />
                  <q-btn
                    class="q-ml-xs"
                    dense
                    round
                    color="positive"
                    size="md"
                    icon="mode_edit"
                    @click="onEditParam(props.row)"
                  />
                  <q-btn
                    class="q-ml-xs"
                    dense
                    round
                    color="negative"
                    size="md"
                    icon="delete"
                    @click="onDeleteParam(props.rowIndex)"
                  />
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
              @click="onAddParam()"
            />
          </div>
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn
              label="Cancel"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="createParam"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card style="min-width: 300px">
      <q-card-section>
        <q-form @submit="onSubmitParam(createParam)" class="q-gutter-md">
          <q-select
            outlined
            dense
            v-model="param.name"
            :options="job.task.params"
            option-label="name"
            option-value="name"
            hint="Parameter name *"
            emit-value
            map-options
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please select something',
            ]"
          />
          <q-input
            v-model="param.value"
            dense
            outlined
            hint="Parameter value *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn
              label="Cancel"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, date } from "quasar";
import { computed, ref } from "vue";
import { useUtils } from "src/stores/utils";
import axios from "axios";

const columns = [{ name: "state" }, { name: "job" }, { name: "actions" }];
const rows = [];
const job = {
  id: null,
  note: null,
  active: null,
  value: null,
  time: null,
  date: null,
  verbose: null,
  executor: {
    id: null,
    name: null,
    idx: null,
  },
  task: {
    id: null,
    name: null,
    api: null,
    note: null,
    params: [],
  },
  period: {
    id: null,
    name: null,
    idx: null,
  },
  params: [],
};

const scheme = [
  {
    name: "name",
    align: "left",
    field: "name",
    style: "max-width: 40px; width: 40px;",
  },
  {
    name: "value",
    align: "left",
    field: "value",
    style: "font-style: italic; max-width: 70px; width: 70px;",
  },
  { name: "job_id" },
  { name: "actions" },
];
const params = [];
const param = {
  id: null,
  name: null,
  value: null,
  job_id: null,
};

const executors = {
  id: null,
  name: null,
  idx: null,
};

const tasks = {
  id: null,
  name: null,
  note: null,
  params: [],
};

const periods = {
  id: null,
  name: null,
  idx: null,
};

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();

    const actionEdit = ref(false);
    const actionEditParams = ref(false);
    const isShowValue = ref(false);
    const labelBtnParams = ref(">>");
    const paramsDisabled = ref(false);
    const reloadJobsFail = "reload jobs error";
    const reloadJobsWarning = "Jobs reload fail";

    return {
      utils,
      createJob: ref(false),
      actionEdit,
      actionEditParams,
      paramsDisabled,
      columns,
      rows: ref(rows),
      job: ref(job),
      scheme,
      params,
      param: ref(param),
      tasks: ref(tasks),
      executors: ref(executors),
      periods: ref(periods),
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      isShowValue,
      periodState: computed(() =>
        isShowValue.value == false ? "wd-max" : "wd-260 ml-10"
      ),
      labelBtnParams,
      showParams: ref(false),
      showBtnAddParam: ref(false),
      createParam: ref(false),
      checkTime(period, v) {
        switch (period) {
          case "once":
          case "day":
          case "week":
          case "month":
          case "year":
            return utils.fulltime(v);
          default:
            return !v || !v.length ? true : utils.fulltime(v);
        }
      },
      checkDate(period, v) {
        switch (period) {
          case "month":
          case "year":
            return utils.date(v);
          default:
            return !v || !v.length ? true : utils.date(v);
        }
      },
      async GetExecutors() {
        await axios
          .get("/api/v1/admin/schedule/executors/get")
          .then(async (response) => {
            this.executors = response.data.data;
            await this.GetTasks();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async GetTasks() {
        await axios
          .get("/api/v1/admin/schedule/tasks/get")
          .then(async (response) => {
            this.tasks = response.data.data;
            await this.GetPeriods();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async GetPeriods() {
        await axios
          .get("/api/v1/admin/schedule/periods/get")
          .then(async (response) => {
            this.periods = response.data.data;
            await this.GetJobs();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async GetJobs() {
        await axios
          .get("/api/v1/admin/schedule/jobs/get")
          .then(async (response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onTaskParamSelect(val) {
        paramsDisabled.value = val ? false : true;
      },
      async reloadWarning(err) {
        if (err.response.data.message === reloadJobsFail) {
          $q.notify({
            type: "warning",
            message: reloadJobsWarning,
          });
          await this.GetJobs();
        } else {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        }
      },
      onAdd() {
        actionEdit.value = false;
        paramsDisabled.value = true;
        isShowValue.value = false;
        this.job = {};
        this.params = [];
        this.job.verbose = false;
        labelBtnParams.value = ">>";
        this.HideParams();
        this.createJob = true;
      },
      onEdit(row) {
        actionEdit.value = true;
        paramsDisabled.value = false;
        this.job = row;
        isShowValue.value = this.job.period.id === "once" ? false : true;
        this.params = row.params;
        labelBtnParams.value = "<<";
        this.ShowParams();
        this.createJob = true;
      },
      onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/schedule/job/" + row.id;
          axios
            .delete(url)
            .then(async () => {
              await this.GetJobs();
            })
            .catch(async (err) => {
              await this.reloadWarning(err);
            });
        });
      },
      async onActivate(row) {
        if (row.active) {
          let url = "/api/v1/admin/schedule/job/deactivate/" + row.id;
          await axios
            .put(url)
            .then(async () => {
              await this.GetJobs();
            })
            .catch(async (err) => {
              await this.reloadWarning(err);
            });
        } else {
          let url = "/api/v1/admin/schedule/job/activate/" + row.id;
          await axios
            .put(url)
            .then(async () => {
              await this.GetJobs();
            })
            .catch(async (err) => {
              await this.reloadWarning(err);
            });
        }
      },
      async onRun(row) {
        let url = "/api/v1/admin/schedule/job/run/" + row.id;
        await axios
          .put(url)
          .then(async () => {
            await this.GetJobs();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      activeIcon(row) {
        return row.active ? "alarm" : "alarm_off";
      },
      activeColor(row) {
        return row.active ? "positive" : "grey";
      },
      async onSubmit() {
        this.job.params = this.params;
        if (!this.validJobParams(this.job)) {
          return;
        }
        this.createJob = false;
        this.job.value = parseInt(this.job.value, 10);
        if (actionEdit.value) {
          await axios
            .post("/api/v1/admin/schedule/job/edit", this.job)
            .then(async () => {
              await this.GetJobs();
            })
            .catch(async (err) => {
              await this.reloadWarning(err);
            });
        } else {
          await axios
            .post("/api/v1/admin/schedule/job/add", this.job)
            .then(async () => {
              await this.GetJobs();
            })
            .catch(async (err) => {
              await this.reloadWarning(err);
            });
        }
      },
      onPeriodChange(val) {
        switch (val.id) {
          case "once":
            isShowValue.value = false;
            break;
          case "second":
          case "minute":
          case "hour":
          case "day":
          case "week":
          case "month":
          case "year":
            isShowValue.value = true;
            break;
          default:
            $q.notify({
              type: "negative",
              message: "Unknown period: " + val,
            });
        }
      },
      onParams() {
        if (labelBtnParams.value == ">>") {
          labelBtnParams.value = "<<";
          this.ShowParams();
        } else {
          this.HideParams();
          labelBtnParams.value = ">>";
        }
      },
      onAddParam() {
        actionEditParams.value = false;
        this.param = {};
        this.createParam = true;
      },
      onEditParam(row) {
        actionEditParams.value = true;
        this.param = row;
        this.createParam = true;
      },
      onDeleteParam(rowIndex) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          if (rowIndex !== -1) {
            this.params.splice(rowIndex, 1);
            this.ShowParams();
          }
        });
      },
      onSubmitParam() {
        if (!actionEditParams.value && !this.validParam(this.param)) {
          return;
        }
        this.param.id = null;
        this.param.job_id = null;
        if (!actionEditParams.value) {
          this.params.push(this.param);
        }
        this.createParam = false;
        this.ShowParams();
      },
      ShowParams() {
        this.showBtnAddParam = this.params.length === 0;
        this.showParams = !this.showBtnAddParam;
      },
      HideParams() {
        this.showBtnAddParam = false;
        this.showParams = false;
      },
      validJobParams(item) {
        if (item.task.params.length !== item.params.length) {
          $q.notify({
            type: "negative",
            message: "The number of task and job parameters do not match!",
          });
          return false;
        }
        return true;
      },
      validParam(item) {
        for (let param of this.params) {
          if (item.name === param.name) {
            $q.notify({
              type: "negative",
              message: "Parameter already set!",
            });
            return false;
          }
        }
        return true;
      },
      oneToEmpty(val) {
        return val <= 1 ? " " : " " + val + " ";
      },
      isRegularPeriod(period) {
        return period !== "once";
      },
      isOncePeriod(period) {
        return period === "once";
      },
      isTimeOrDate(time, date) {
        return !utils.isEmpty(time) || !utils.isEmpty(date);
      },
      moreThanNow(ts, ds, repeat) {
        try {
          if (
            !ts ||
            ts.length === 0 ||
            !ds ||
            ds.length === 0 ||
            (repeat && repeat !== "0")
          ) {
            return true;
          }
          const time = date.formatDate(ds + " " + ts, "YYYY-MM-DD HH:mm:ss");
          return date.formatDate(time, "X") > date.formatDate(new Date(), "X");
        } catch (err) {
          console.log(err);
          return false;
        }
      },
    };
  },
  async mounted() {
    await this.GetExecutors();
  },
};
</script>

<style lang="sass" scoped>
.bot-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.crisper
  .square
    margin: 5px
    background: rgba(86, 61, 124, .15)
    border: 1px solid rgba(86, 61, 124, .2)
.right
  margin-left: auto
</style>
