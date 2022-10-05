<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >SSH key management</q-item-label
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
          >
            <q-tooltip> Add new ssh key </q-tooltip>
          </q-btn>
        </q-item>
        <q-table
          hide-header
          :rows="rows"
          :columns="columns"
          row-key="id"
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
              <q-icon name="mdi-key-variant" size="md" />
            </q-td>
          </template>
          <template v-slot:body-cell-key="props">
            <q-td :props="props" class="wd-100">
              <div class="text-subtitle1 text-bold text-left text-primary">
                {{ props.row.owner }}
              </div>
              <div class="text-subtitle2">{{ props.row.finger }}</div>
              <div class="text-body1 text-weight-thin">
                Created {{ format(props.row.created) }}
              </div>
              <div v-if="props.row.used" class="text-body1 text-weight-thin">
                Last used {{ format(props.row.used) }}
              </div>
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
              >
                <q-tooltip> Add new ssh key </q-tooltip>
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
                <q-tooltip> Delete ssh key </q-tooltip>
              </q-btn>
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
            v-model="key.owner"
            outlined
            dense
            hint="Key Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="key.finger"
            dense
            outlined
            hint="Content *"
            type="textarea"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
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
import { date, useQuasar } from "quasar";
import { computed, ref } from "vue";
import axios from "axios";

const columns = [
  { name: "state" },
  { name: "icon" },
  { name: "key" },
  { name: "actions" },
];

const rows = [];

const key = {
  id: null,
  owner: null,
  finger: null,
  created: null,
  used: null,
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
      key: ref(key),
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      format(time) {
        return date.formatDate(time, "MMM DD, YYYY HH:mm:ss");
      },
      async GetKeys() {
        await axios
          .get("/api/v1/admin/sshclient/sshkeys/get")
          .then((response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
          })
          .catch(() => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        this.key = {};
        this.create = true;
      },
      onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/sshclient/sshkeys/" + row.id;
          axios
            .delete(url)
            .then(() => {
              this.GetKeys();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        });
      },
      async onSubmit(dlg) {
        this.create = false;
        await axios
          .post("/api/v1/admin/sshclient/sshkeys/add", this.key)
          .then(() => {
            this.GetKeys();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      activeIcon(row) {
        return row.activity ? "task_alt" : "highlight_off";
      },
      activeColor(row) {
        return row.activity ? "positive" : "grey";
      },
    };
  },
  async mounted() {
    await this.GetKeys();
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
