<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >SSH hosts management</q-item-label
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
            <q-tooltip> Add new ssh host </q-tooltip>
          </q-btn>
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
          <template v-slot:body-cell-host="props">
            <q-td :props="props" class="wd-100">
              <div class="text-subtitle1 text-bold text-left text-primary">
                {{ props.row.host }}
              </div>
              <div class="text-subtitle2">{{ props.row.short_finger }}</div>
              <div class="text-meta">
                Created {{ utils.formatTime(props.row.created) }}
              </div>
              <div v-if="!utils.emptyTime(props.row.used)" class="text-meta">
                Last used {{ utils.formatTime(props.row.used) }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="primary"
                size="md"
                icon="add"
                @click="onAdd()"
              >
                <q-tooltip> Add new ssh host </q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-xs"
                dense
                round
                color="positive"
                size="md"
                icon="mode_edit"
                @click="onEdit(props.row)"
              >
                <q-tooltip> Edit ssh host </q-tooltip>
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
                <q-tooltip> Delete ssh host </q-tooltip>
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
            v-model="host.host"
            outlined
            dense
            hint="Host Name/IP *"
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
            v-model="host.ssh_key"
            :options="ssh_keys"
            option-label="owner"
            option-value="id"
            hint="Service *"
            lazy-rules
            :rules="[() => host.ssh_key || 'Please type something']"
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
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import { useUtils } from "src/stores/utils";
import axios from "axios";

const columns = [
  { name: "state" },
  { name: "icon" },
  { name: "host" },
  { name: "actions" },
];

const rows = [];

const ssh_keys = {
  id: null,
  owner: null,
  finger: null,
  created: null,
  used: null,
  activity: null,
  short_finger: null,
};

const host = {
  id: null,
  host: null,
  finger: null,
  created: null,
  used: null,
  ssh_key: {
    id: null,
    owner: null,
    finger: null,
    created: null,
    used: null,
    activity: null,
    short_finger: null,
  },
  activity: null,
  short_finger: null,
};

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();
    const actionEdit = ref(false);

    return {
      utils,
      create: ref(false),
      actionEdit,
      columns,
      rows: ref(rows),
      host: ref(host),
      ssh_keys: ref(ssh_keys),
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetKeys() {
        await axios
          .get("/api/v1/admin/sshclient/sshkeys/get")
          .then(async (response) => {
            this.ssh_keys = response.data.data;
            await this.GetHosts();
          })
          .catch(() => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async GetHosts() {
        await axios
          .get("/api/v1/admin/sshclient/sshhosts/get")
          .then((response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
            console.log("ROWS:", this.rows);
          })
          .catch(() => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        actionEdit.value = false;
        this.host = {};
        this.create = true;
      },
      onEdit(row) {
        actionEdit.value = true;
        this.host = row;
        console.log("ROW:", row);
        this.create = true;
      },
      onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/sshclient/sshhosts/" + row.id;
          axios
            .delete(url)
            .then(() => {
              this.GetHosts();
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
            .post("/api/v1/admin/sshclient/sshhosts/edit", this.host)
            .then(async () => {
              await this.GetHosts();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .post("/api/v1/admin/sshclient/sshhosts/add", this.host)
            .then(async () => {
              await this.GetHosts();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
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
