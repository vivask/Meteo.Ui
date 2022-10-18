<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Accounting Radius</q-item-label
          >
        </q-item>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-state="props">
            <q-td :props="props" class="wd-60">
              <q-btn
                class="q-ml-xs"
                dense
                round
                :color="stateColor(props.row)"
                size="md"
                :icon="stateIcon(props.row)"
                @click="onVerify(props.row)"
              >
                <q-tooltip>Confirm verify user</q-tooltip>
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
  {
    name: "state",
  },
  {
    name: "username",
    label: "User",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "nasipaddress",
    label: "User IP",
    align: "left",
    field: "nasipaddress",
    sortable: true,
  },
  {
    name: "nasportid",
    label: "AP",
    align: "left",
    field: "nasportid",
    sortable: true,
  },
  {
    name: "acctstarttime",
    label: "Start time",
    align: "left",
    field: "acctstarttime",
    sortable: true,
  },
  {
    name: "acctupdatetime",
    label: "Update time",
    align: "left",
    field: "acctupdatetime",
    sortable: true,
  },
  {
    name: "acctstoptime",
    label: "Stop time",
    align: "left",
    field: "acctstoptime",
    sortable: true,
  },
  {
    name: "calledstationid",
    label: "Station Id",
    align: "left",
    field: "calledstationid",
    sortable: true,
  },
  {
    name: "callingstationid",
    label: "User Id",
    align: "left",
    field: "callingstationid",
    sortable: true,
  },
];

const rows = [];

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();

    return {
      utils,
      create: ref(false),
      columns,
      rows: ref(rows),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetAccounting() {
        await axios
          .get("/api/v1/admin/radius/account/get")
          .then((response) => {
            this.rows = response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onVerify(row) {
        const url = "/api/v1/admin/radius/account/verified/" + row.id;
        await axios
          .put(url)
          .then(async () => {
            await this.GetAccounting();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      stateColor(row) {
        console.log(row);
        return row.verified.length > 0 &&
          row.valid.length > 0 &&
          row.valid === row.username
          ? "positive"
          : row.verified.length > 0 &&
            row.valid.length > 0 &&
            !(row.valid === row.username)
          ? "negative"
          : "warning";
      },
      stateIcon(row) {
        return row.verified.length > 0 ? "verified_user" : "mdi-shield-account";
      },
    };
  },
  async mounted() {
    await this.GetAccounting();
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
