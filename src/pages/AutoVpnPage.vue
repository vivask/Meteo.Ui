<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Hosts Redirected to VPN</q-item-label
          >
        </q-item>
        <q-table
          hide-header
          :rows="rows"
          :columns="columns"
          row-key="id"
          selection="multiple"
          v-model:selected="selected"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="warning"
                size="md"
                icon="healing"
                @click="onIgnore(props.row)"
              >
                <q-tooltip>Ignore host</q-tooltip>
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
                <q-tooltip>Delete host</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import { useUtils } from "src/stores/utils";
import axios from "axios";

const columns = [
  { name: "name", align: "left", field: "id", sortable: true },
  {
    name: "created",
    align: "left",
    field: "created",
    sortable: true,
    format: (val) => useUtils().formatTime(val),
  },
  { name: "actions" },
];

const rows = [];

const record = {
  id: null,
  created: null,
};

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();
    const selected = ref([]);

    return {
      utils,
      columns,
      rows: ref(rows),
      selected,
      record: ref(record),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetRecords() {
        await axios
          .get("/api/v1/admin/proxy/autovpn/get")
          .then((response) => {
            this.rows = response.data.data;
          })
          .catch(() => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onIgnore(row) {
        let data = [];
        if (selected.value.length == 0) {
          data.push(row);
        } else {
          data = selected.value;
        }
        console.log(data);
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to ignore this items?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await axios
            .put("/api/v1/admin/proxy/autovpn/ignore", data)
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
      onDelete(row) {
        let data = [];
        if (selected.value.length == 0) {
          data.push(row);
        } else {
          data = selected.value;
        }
        console.log(data);
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this items?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await axios
            .put("/api/v1/admin/proxy/autovpn/delete", data)
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
    };
  },
  async mounted() {
    await this.GetRecords();
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
