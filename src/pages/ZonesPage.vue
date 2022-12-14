<template>
  <div class="q-pa-md" v-if="loaded && !error">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Local hosts</q-item-label>
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
            <q-td :props="props" class="wd-30">
              <q-icon
                :name="activeIcon(props.row)"
                size="1.2rem"
                :color="activeColor(props.row)"
              />
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
            v-model="zone.name"
            outlined
            dense
            hint="Host Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="zone.address"
            outlined
            dense
            hint="IP Address *"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0 && utils.validateIP(val)) ||
                'Invalid inputs',
            ]"
          />
          <q-input v-model="zone.mac" dense outlined hint="MAC Address" />
          <q-input v-model="zone.note" dense outlined hint="Note" />
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

  <UiContainer v-if="!loaded">
    <UiSpinner></UiSpinner>
  </UiContainer>

  <UiContainer v-if="error">
    <UiAlert>{{ message }}</UiAlert>
  </UiContainer>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import { useUtils } from "src/stores/utils";
import axios from "axios";
import UiContainer from "src/components/UiContainer.vue";
import UiAlert from "src/components/UiAlert.vue";
import UiSpinner from "src/components/UiSpinner.vue";

const columns = [
  { name: "state" },
  { name: "address", align: "left", field: "address", sortable: true },
  { name: "name", align: "left", field: "name", sortable: true },
  { name: "mac", align: "left", field: "mac", sortable: true },
  { name: "note", align: "left", field: "note", sortable: true },
  { name: "actions" },
];

const rows = [];

const zone = {
  id: null,
  name: null,
  address: null,
  mac: null,
  note: null,
};

export default {
  components: {
    UiContainer,
    UiAlert,
    UiSpinner,
  },
  setup() {
    const $q = useQuasar();
    const utils = useUtils();
    const actionEdit = ref(false);

    return {
      utils,
      loaded: ref(false),
      error: ref(false),
      message: ref(null),
      create: ref(false),
      columns,
      rows: ref(rows),
      zone: ref(zone),
      actionEdit,
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetZones() {
        this.loaded = false;
        this.error = false;
        this.message = null;
        await axios
          .get("/api/v1/proxy/zones/get")
          .then((response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
            this.loaded = true;
            this.error = false;
          })
          .catch((err) => {
            this.message = err.response.data.message;
            this.loaded = true;
            this.error = true;
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        actionEdit.value = false;
        this.zone = {};
        this.create = true;
      },
      onEdit(row) {
        actionEdit.value = true;
        this.zone = row;
        this.create = true;
      },
      async onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/proxy/zones/" + row.id;
          axios
            .delete(url)
            .then(async () => {
              await this.GetZones();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        });
      },
      activeIcon(row) {
        return row.active ? "task_alt" : "highlight_off";
      },
      activeColor(row) {
        return row.active ? "positive" : "grey";
      },
      async onSubmit() {
        this.create = false;
        if (actionEdit.value) {
          await axios
            .post("/api/v1/proxy/zones/edit", this.zone)
            .then(() => {
              this.GetZones();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .post("/api/v1/proxy/zones/add", this.zone)
            .then(() => {
              this.GetZones();
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
    await this.GetZones();
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
