<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Tasks Management</q-item-label
          >
          <q-space />
          <q-btn
            v-if="isShowHeaderButton"
            class="wd-100"
            dense
            color="primary"
            size="md"
            label="Add"
            @click="onAdd()"
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
            <q-td :props="props" class="wd-40">
              <q-icon name="task" size="2rem" />
            </q-td>
          </template>
          <template v-slot:body-cell-job="props">
            <q-td :props="props">
              <q-card square flat>
                <q-card-section align="left">
                  <div class="text-subtitle1 text-bold job-name">
                    {{ props.row.name }}
                  </div>
                  <div class="text-subtitle2">{{ props.row.note }}</div>
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
              />
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="positive"
                size="md"
                icon="mode_edit"
                @click="onEdit(props.row)"
              />
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="negative"
                size="md"
                icon="delete"
                @click="onDelete(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <q-dialog v-model="create" transition-show="rotate" transition-hide="rotate">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form @submit="onSubmit(create)" class="q-gutter-md">
          <q-input
            v-model="task.id"
            dense
            hint="Identifier *"
            outlined
            :disable="disable"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="task.name"
            dense
            hint="Name *"
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="task.api"
            dense
            hint="Api *"
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input v-model="task.note" dense outlined hint="Description" />

          <q-btn
            dense
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
              dense
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
          <q-input
            v-model="param.name"
            dense
            outlined
            hint="Parameter name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn
              dense
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
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import axios from "axios";

const columns = [
  { name: "state" },
  { name: "id" },
  { name: "job" },
  { name: "note" },
  { name: "params" },
  { name: "actions" },
];

const rows = [];

const task = {
  id: null,
  name: null,
  api: null,
  note: null,
  params: [],
};

const scheme = [
  {
    name: "name",
    align: "left",
    field: "name",
    sortable: true,
    style: "max-width: 50px; width: 50px;",
  },
  { name: "actions" },
];

const params = [];

const param = {
  id: null,
  name: null,
  task_id: null,
};

export default {
  setup() {
    const $q = useQuasar();

    const labelBtnParams = ref(">>");
    const actionEdit = ref(false);
    const actionEditParams = ref(false);
    const disable = ref(false);

    return {
      create: ref(false),
      actionEdit,
      actionEditParams,
      disable,
      columns,
      rows: ref(rows),
      task: ref(task),
      labelBtnParams,
      scheme,
      params,
      param: ref(param),
      showParams: ref(false),
      showBtnAddParam: ref(false),
      createParam: ref(false),
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${
            $q.screen.name === "sm" ? 8 : $q.screen.name === "xs" ? 11 : 5
          }`
      ),
      async GetTasks() {
        await axios
          .get("/api/v1/admin/schedule/tasks/get")
          .then((response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        actionEdit.value = false;
        disable.value = false;
        this.task = {};
        this.params = [];
        labelBtnParams.value = ">>";
        this.HideParams();
        this.create = true;
      },
      onEdit(row) {
        actionEdit.value = true;
        disable.value = true;
        this.task = row;
        this.params = row.params;
        labelBtnParams.value = "<<";
        this.ShowParams();
        this.create = true;
      },
      async onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/schedule/tasks/" + row.id;
          axios
            .delete(url)
            .then(() => {
              this.GetTasks();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        });
      },
      async onSubmit() {
        this.create = false;
        this.task.params = this.params;
        if (actionEdit.value) {
          await axios
            .post("/api/v1/admin/schedule/tasks/edit", this.task)
            .then(() => {
              this.GetTasks();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .post("/api/v1/admin/schedule/tasks/add", this.task)
            .then(() => {
              this.GetTasks();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      ShowParams() {
        this.showBtnAddParam = this.params.length === 0;
        this.showParams = !this.showBtnAddParam;
      },
      HideParams() {
        this.showBtnAddParam = false;
        this.showParams = false;
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
        this.param.id = null;
        this.param.task_id = null;
        this.params.push(this.param);
        this.createParam = false;
        this.ShowParams();
      },
    };
  },
  async mounted() {
    await this.GetTasks();
  },
  methods: {},
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
.job-name
  color: #1976D2
</style>
