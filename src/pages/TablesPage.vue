<template>
  <div class="q-pa-md">
    <q-input
      ref="fileInput"
      style="display: none"
      v-model="file"
      type="file"
      label="Standard"
    ></q-input>
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Tables management</q-item-label
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
          selection="multiple"
          v-model:selected="selected"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-state="props">
            <q-td :props="props">
              <q-icon name="mdi-table" size="2rem" />
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
                <q-tooltip>Add table name</q-tooltip>
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
                <q-tooltip>Edit table name</q-tooltip>
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
                <q-tooltip>Delete table name</q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                :disable="!props.row.import"
                round
                color="warning"
                size="md"
                icon="mdi-table-arrow-left"
                @click="onImport(props.row)"
              >
                <q-tooltip>Import table content from csv</q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="secondary"
                size="md"
                icon="mdi-content-save"
                @click="onSave(props.row)"
              >
                <q-tooltip>Save table content to csv</q-tooltip>
              </q-btn>
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
            v-model="table.name"
            dense
            hint="Name *"
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input v-model="table.note" dense outlined hint="Note" />
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
              <template v-slot:body-cell-value="props">
                <q-td :props="props" class="wd-50">
                  <div class="text-subtitle2 text-left text-primary">
                    {{ props.row.stype.note }}
                  </div>
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
                    @click="createParam = true"
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
                    @click="onDeleteParam(props.row)"
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
              @click="createParam = true"
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
            v-model="param.stype"
            :options="stypes"
            option-label="note"
            hint="Sync method *"
            lazy-rules
            :rules="[() => param.stype || 'Please select something']"
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
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import axios from "axios";

const columns = [
  { name: "state", align: "left" },
  { name: "name", align: "left", field: "name", sortable: true },
  { name: "note", align: "left", field: "note", sortable: true },
  { name: "actions" },
];

const rows = [];

const table = {
  name: null,
  note: null,
  syncedat: null,
  params: [],
};

const scheme = [{ name: "value", align: "left" }, { name: "actions" }];

const params = [];

const param = {
  id: null,
  stype: {
    id: null,
    note: null,
  },
  table_id: null,
};

const stypes = {
  id: null,
  note: null,
};

export default {
  setup() {
    const $q = useQuasar();

    const labelBtnParams = ref(">>");
    const actionEdit = ref(false);
    const actionEditParams = ref(false);
    const selected = ref([]);

    return {
      file: ref(null),
      create: ref(false),
      actionEdit,
      actionEditParams,
      columns,
      rows: ref(rows),
      table: ref(table),
      scheme,
      params,
      param: ref(param),
      stypes: ref(stypes),
      showParams: ref(false),
      showBtnAddParam: ref(false),
      createParam: ref(false),
      isShowHeaderButton: ref(false),
      labelBtnParams,
      selected,
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetStypes() {
        await axios
          .get("/api/v1/database/stypes/get")
          .then(async (response) => {
            this.stypes = response.data.data;
            await this.GetTables();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async GetTables() {
        await axios
          .get("/api/v1/database/tables/get")
          .then(async (response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        actionEdit.value = false;
        this.table = {};
        this.params = [];
        labelBtnParams.value = ">>";
        this.HideParams();
        this.create = true;
      },
      onEdit(row) {
        actionEdit.value = true;
        this.table = row;
        this.params = row.params;
        labelBtnParams.value = "<<";
        this.ShowParams();
        this.create = true;
      },
      onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          if (selected.value.length === 0) {
            const url = "/api/v1/database/table/" + row.name;
            await axios
              .delete(url)
              .then(() => {
                this.GetTables();
              })
              .catch((err) => {
                $q.notify({
                  type: "negative",
                  message: err.response.data.message,
                });
              });
          } else {
            await axios
              .post("/api/v1/database/delete/tables", selected.value)
              .then(() => {
                this.GetTables();
              })
              .catch((err) => {
                $q.notify({
                  type: "negative",
                  message: err.response.data.message,
                });
              });
          }
        });
      },
      async onSubmit() {
        this.create = false;
        this.table.params = this.params;
        if (actionEdit.value) {
          await axios
            .post("/api/v1/database/table/edit", this.table)
            .then(() => {
              this.GetTables();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .post("/api/v1/database/table/add", this.table)
            .then(() => {
              this.GetTables();
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
      onDeleteParam(row) {
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
      onSubmitParam(dlg) {
        this.param.id = null;
        this.param.table_id = null;
        if (!actionEditParams.value) {
          this.params.push(this.param);
        }
        this.createParam = false;
        this.ShowParams();
      },
      onImport(row) {
        //this.$refs.fileInput.$el.click();
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to import this table from csv?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          if (selected.value.length === 0) {
            const url = "/api/v1/database/table/import/" + row.name;
            await axios.put(url).catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
          } else {
            await axios
              .post("/api/v1/database/import/tables", selected.value)
              .catch((err) => {
                $q.notify({
                  type: "negative",
                  message: err.response.data.message,
                });
              });
          }
        });
      },
      onSave(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to save this table to csv?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          if (selected.value.length === 0) {
            const url = "/api/v1/database/table/save/" + row.name;
            await axios
              .put(url)
              .then(() => {
                this.GetTables();
              })
              .catch((err) => {
                $q.notify({
                  type: "negative",
                  message: err.response.data.message,
                });
              });
          } else {
            await axios
              .post("/api/v1/database/save/tables", selected.value)
              .then(() => {
                this.GetTables();
              })
              .catch((err) => {
                $q.notify({
                  type: "negative",
                  message: err.response.data.message,
                });
              });
          }
        });
      },
    };
  },
  async mounted() {
    await this.GetStypes();
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
.job-name
  color: #1976D2
</style>
