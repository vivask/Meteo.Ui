<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Message log</q-item-label>
          <q-space />
          <q-btn
            class="wd-100"
            dense
            color="primary"
            size="md"
            label="Refresh"
            @click="onRefresh()"
          />
          <q-btn
            class="wd-100 ml-10"
            dense
            color="primary"
            size="md"
            label="Clear"
            @click="onClear()"
          />
        </q-item>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="date"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-date="props">
            <q-td
              :props="props"
              class="wd-80"
              :class="logColor(props.row.type)"
            >
              {{ utils.getDate(props.row.date_time) }}
            </q-td>
          </template>
          <template v-slot:body-cell-time="props">
            <q-td
              :props="props"
              class="wd-50"
              :class="logColor(props.row.type)"
            >
              {{ utils.getTime(props.row.date_time) }}
            </q-td>
          </template>
          <template v-slot:body-cell-message="props">
            <q-td :props="props" :class="logColor(props.row.type)">
              {{ props.row.message }}
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
    name: "date",
    align: "left",
    label: "Date",
  },
  {
    name: "time",
    align: "left",
    label: "Time",
  },
  {
    name: "message",
    align: "left",
    label: "Message",
  },
];

const rows = [];

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();

    return {
      utils,
      columns,
      rows: ref(rows),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetEsp32Log() {
        await axios
          .get("/api/v1/admin/esp32/loging/get")
          .then(async (response) => {
            this.rows = response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onRefresh(row) {
        await this.GetEsp32Log();
      },
      async onClear(row) {
        await axios
          .put("/api/v1/admin/esp32/loging/clear")
          .then(async () => {
            await this.GetEsp32Log();
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      logColor(msgType) {
        switch (msgType) {
          case "I":
            return "text-subtitle1 text-positive";
          case "W":
            return "text-subtitle1 text-warning";
          case "E":
            return "text-subtitle1 text-warning";
          default:
            return "text-subtitle1 text-grey";
        }
      },
    };
  },
  async mounted() {
    await this.GetEsp32Log();
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
