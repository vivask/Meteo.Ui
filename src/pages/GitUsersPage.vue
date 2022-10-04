<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Git users management</q-item-label
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
            <q-tooltip>Add new git user</q-tooltip>
          </q-btn>
        </q-item>
        <q-table
          hide-header
          :rows="rows"
          :columns="columns"
          row-key="name"
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
              <q-icon name="mdi-account" size="md" />
            </q-td>
          </template>
          <template v-slot:body-cell-key="props">
            <q-td :props="props" class="wd-100">
              <div class="text-subtitle1 text-bold key-name">
                {{ props.row.name }}
              </div>
              <div class="text-subtitle2">User: {{ props.row.user }}</div>
              <div class="text-subtitle2">{{ props.row.createdat }}</div>
              <div class="text-subtitle2">{{ props.row.used }}</div>
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
                <q-tooltip>Add new git user</q-tooltip>
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
                <q-tooltip>Edit git user</q-tooltip>
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
                <q-tooltip>Delete git user</q-tooltip>
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
          <q-select
            outlined
            dense
            v-model="user.service"
            :options="services"
            hint="Service *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="user.username"
            outlined
            dense
            hint="User name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="user.password"
            outlined
            dense
            hint="Password *"
            type="password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-if="visible"
            v-model="confirm"
            outlined
            dense
            hint="Confirm password *"
            type="password"
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
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import axios from "axios";

const columns = [
  { name: "state" },
  { name: "icon" },
  { name: "key" },
  { name: "name" },
  { name: "user" },
  { name: "createdat" },
  { name: "actions" },
];

const rows = [];

const user = {
  id: null,
  username: null,
  password: null,
  service: null,
  created: null,
  used: null,
  activity: null,
};

export default {
  setup() {
    const $q = useQuasar();
    const actionEdit = ref(false);
    const confirm = ref(null);

    return {
      create: ref(false),
      actionEdit,
      columns,
      rows: ref(rows),
      user: ref(user),
      confirm,
      visible: ref(true),
      services: ["Mikrotik router backup"],
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetUsers() {
        await axios
          .get("/api/v1/admin/sshclient/gitusers/get")
          .then((response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
          })
          .catch(() => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        this.visible = true;
        actionEdit.value = false;
        this.user.username = "";
        this.user.password = "";
        this.user.service = "";
        this.create = true;
      },
      onEdit(row) {
        this.visible = false;
        actionEdit.value = true;
        this.user.id = row.id;
        this.user.username = row.username;
        this.user.password = row.password;
        this.user.service = row.service;
        this.user.created = row.create;
        this.user.used = row.used;
        this.create = true;
      },
      onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/sshclient/gitusers/" + row.id;
          axios
            .delete(url)
            .then(() => {
              this.GetUsers();
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
        if (actionEdit.value) {
          await axios
            .post("/api/v1/admin/sshclient/gitusers/edit", this.user)
            .then(() => {
              this.GetUsers();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .post("/api/v1/admin/sshclient/gitusers/add", this.user)
            .then(() => {
              this.GetUsers();
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
    await this.GetUsers();
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
.key-name
  color: #1976D2
</style>