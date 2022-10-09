<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Hosts Redirected to VPN</q-item-label
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
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                round
                color="primary"
                size="md"
                icon="add"
                @click="onAdd()"
              ></q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="positive"
                size="md"
                icon="mode_edit"
                @click="onEdit(props.row)"
              ></q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="negative"
                size="md"
                icon="delete"
                @click="onDelete(props.row)"
              ></q-btn>
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
            v-model="record.name"
            dense
            outlined
            hint="Name/IP Address *"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0 && utils.validateHost(val)) ||
                'Invalid inputs',
            ]"
          />
          <q-select
            outlined
            dense
            v-model="record.list"
            :options="list"
            option-label="id"
            hint="Acess list *"
            lazy-rules
            :rules="[() => record.list || 'Please select something']"
          />
          <q-input v-model="record.note" dense outlined hint="Note" />
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
import { useUtils } from "src/stores/utils";
import axios from "axios";

const columns = [
  { name: "name", align: "left", field: "name", sortable: true },
  {
    name: "vpnlist",
    align: "left",
    field: (row) => row.list.id,
    sortable: true,
  },
  { name: "note", align: "left", field: "note", sortable: true },
  { name: "actions" },
];

const rows = [];

const list = {
  id: null,
};

const record = {
  id: null,
  name: null,
  note: null,
  list: {
    id: null,
  },
};

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();
    const actionEdit = ref(false);

    return {
      utils,
      create: ref(false),
      columns,
      rows: ref(rows),
      record: ref(record),
      list: ref(list),
      actionEdit,
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetLists() {
        await axios
          .get("/api/v1/admin/proxy/vpnlists/get")
          .then(async (response) => {
            this.list = response.data.data;
            await this.GetRecords();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async GetRecords() {
        await axios
          .get("/api/v1/admin/proxy/manualvpn/get")
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
        this.record = {};
        this.create = true;
      },
      onEdit(row) {
        actionEdit.value = true;
        this.record = row;
        this.create = true;
      },
      onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          const url = "/api/v1/admin/proxy/manualvpn/" + row.id;
          await axios
            .delete(url)
            .then(() => {
              this.GetRecords();
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
        if (actionEdit.value) {
          await axios
            .post("/api/v1/admin/proxy/manualvpn/edit", this.record)
            .then(async () => {
              await this.GetRecords();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .post("/api/v1/admin/proxy/manualvpn/add", this.record)
            .then(async () => {
              await this.GetRecords();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
    };
  },
  async mounted() {
    await this.GetLists();
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
</style>
