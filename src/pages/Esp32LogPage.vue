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
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, ref } from "vue";

const columns = [
  {
    name: "date",
    align: "left",
    label: "Date",
    field: "date",
    sortable: true,
    style: "width: 40px",
  },
  {
    name: "time",
    align: "left",
    label: "Time",
    field: "time",
    sortable: true,
    style: "width: 30px",
  },
  {
    name: "message",
    align: "left",
    label: "Message",
    field: "message",
    sortable: true,
  },
];

const rows = [
  {
    date: "2022-09-21",
    time: "11:31:29",
    message: "DS18B20 : BB3C01E07623E728 initialisation success",
  },
];

export default {
  setup() {
    const $q = useQuasar();

    const date = ref(null);
    const time = ref(null);
    const message = ref(null);

    return {
      columns,
      rows,
      date,
      time,
      message,
      isShowHeaderButton: computed(() => rows.length === 0),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      onRefresh(row) {
        console.log(row);
      },
      onClear(row) {
        console.log(row);
      },
    };
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
</style>
