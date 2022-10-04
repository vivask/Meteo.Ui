<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >SSH hosts management</q-item-label
          >
        </q-item>
        <q-table
          hide-header
          :rows="rows"
          :columns="columns"
          row-key="host"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-state="props">
            <q-td :props="props" class="wd-20">
              <q-icon
                :name="activeIcon(props.row)"
                size="1.2rem"
                :color="activeColor(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-icon="props">
            <q-td :props="props" class="wd-80">
              <q-icon name="computer" size="md" />
            </q-td>
          </template>
          <template v-slot:body-cell-key="props">
            <q-td :props="props" class="wd-100">
              <div class="text-subtitle1 text-bold host">
                {{ props.row.host }}
              </div>
              <div class="text-subtitle2">{{ props.row.finger }}</div>
              <div class="text-subtitle2">{{ props.row.createdat }}</div>
              <div class="text-subtitle2">{{ props.row.usedat }}</div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
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
</template>

<script>
import { useQuasar } from "quasar";
import { computed, ref } from "vue";

const columns = [
  { name: "state" },
  { name: "icon" },
  { name: "key" },
  { name: "host" },
  { name: "finger" },
  { name: "createdat" },
  { name: "usedat" },
  { name: "actions" },
];

const rows = [
  {
    active: true,
    host: "192.168.1.6",
    finger: "b3BlbnNzaC1rZXkt",
    createdat: "Добавлено Aug 12, 2022 10:51:36",
    used: " Последний раз использовался Sep 20, 2022 02:00:05",
  },
];

const host = {
  id: null,
  host: null,
  finger: null,
  created: null,
  used: null,
  ssh_keys_id: null,
  activity: null,
  short_finger: null,
};

export default {
  setup() {
    const $q = useQuasar();

    return {
      create: ref(false),
      columns,
      rows: ref(rows),
      isShowHeaderButton: computed(() => rows.length === 0),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      onEdit(row) {
        console.log(row);
      },
      onDelete(row) {
        console.log(row);
      },
      onSubmit(dlg) {
        this.create = false;
      },
      activeIcon(row) {
        return row.active ? "task_alt" : "highlight_off";
      },
      activeColor(row) {
        return row.active ? "positive" : "grey";
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
.host-name
  color: #1976D2
</style>
