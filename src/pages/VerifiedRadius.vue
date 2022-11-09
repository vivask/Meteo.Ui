<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Verified Radius</q-item-label>
        </q-item>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="negative"
                size="md"
                icon="mdi-minus-thick"
                @click="onExclude(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar, date } from "quasar";
import { computed, ref } from "vue";
import axios from "axios";

const columns = [
  {
    name: "username",
    label: "User",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "callingstationid",
    label: "User Id",
    align: "left",
    field: "callingstationid",
    sortable: true,
  },
  {
    name: "acctupdatetime",
    label: "Last used",
    align: "left",
    field: "acctupdatetime",
    sortable: true,
    format: (val, row) => date.formatDate(val, "MMM DD, YYYY HH:mm"),
  },
  { name: "actions" },
];

const rows = [];

export default {
  setup() {
    const $q = useQuasar();

    return {
      columns,
      rows: ref(rows),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetVerified() {
        await axios
          .get("/api/v1/admin/radius/verified/get")
          .then((response) => {
            this.rows = response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onExclude(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to exclude this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/radius/verified/" + row.id;
          axios
            .delete(url)
            .then(async () => {
              await this.GetVerified();
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
    await this.GetVerified();
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
