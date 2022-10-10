<template>
  <div class="q-pa-md">
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
                @click="create = true"
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
            option-label="name"
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

const scheme = [
  { name: "value", align: "left", field: "value", sortable: true },
  { name: "actions" },
];

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

    return {
      create: ref(false),
      actionEdit,
      actionEditParams,
      columns,
      rows: ref(rows),
      scheme,
      params,
      param: ref(param),
      stypes: ref(stypes),
      showParams: ref(false),
      showBtnAddParam: ref(false),
      createParam: ref(false),
      isShowHeaderButton: ref(false),
      labelBtnParams,
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetStypes() {
        await axios
          .get("/api/v1/admin/database/stypes/get")
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
          .get("/api/v1/admin/database/tables/get")
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
          const url = "/api/v1/admin/database/tables/" + row.id;
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
        });
      },
      async onSubmit() {
        this.create = false;
        this.task.params = this.params;
        if (actionEdit.value) {
          await axios
            .post("/api/v1/admin/database/table/edit", this.table)
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
            .post("/api/v1/admin/database/table/add", this.table)
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
