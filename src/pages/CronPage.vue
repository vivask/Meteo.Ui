<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >List of cron jobs</q-item-label
          >
          <q-space />
          <q-btn
            class="wd-100"
            dense
            color="primary"
            size="md"
            label="Update"
            @click="onRefresh()"
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
              <q-icon name="schedule" size="2rem" />
            </q-td>
          </template>
          <template v-slot:body-cell-job="props">
            <q-td :props="props">
              <q-card square flat>
                <q-card-section align="left">
                  <div class="text-subtitle1 text-bold text-left text-primary">
                    {{ props.row.note }}
                  </div>
                  <div class="text-subtitle2 text-left">
                    Next run at: {{ utils.formatTime(props.row.time) }}
                  </div>
                </q-card-section>
              </q-card>
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

const columns = [{ name: "state" }, { name: "job" }];
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
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetJobs() {
        await axios
          .get("/api/v1/admin/schedule/cron/get")
          .then((response) => {
            this.rows = response.data.data === null ? [] : response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onRefresh() {
        await this.GetJobs();
      },
    };
  },
  async mounted() {
    await this.GetJobs();
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
