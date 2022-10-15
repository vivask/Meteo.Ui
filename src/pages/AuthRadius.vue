<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Authentication Radius</q-item-label
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
            <q-td :props="props" class="wd-20">
              <q-icon name="mdi-account-eye-outline" size="1.2rem" />
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
            v-model="radcheck.username"
            outlined
            dense
            hint="User Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="password"
            outlined
            dense
            type="password"
            hint="Password *"
            @update:model-value="passwordChanged = true"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
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
import { useUtils } from "src/stores/utils";
import axios from "axios";

const columns = [
  { name: "state" },
  { name: "username", align: "left", field: "username", sortable: true },
  { name: "attribute", align: "left", field: "attribute" },
  { name: "op", align: "left", field: "op" },
  { name: "actions" },
];

const rows = [];

const radcheck = {
  id: null,
  username: null,
  attribute: null,
  op: null,
  value: null,
};

export default {
  setup() {
    const $q = useQuasar();
    const utils = useUtils();
    const actionEdit = ref(false);

    return {
      utils,
      create: ref(false),
      columns,
      rows: ref(rows),
      radcheck: ref(radcheck),
      password: ref(null),
      confirm: ref(null),
      actionEdit,
      passwordChanged: ref(false),
      isShowHeaderButton: ref(false),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
      async GetUsers() {
        await axios
          .get("/api/v1/admin/radius/users/get")
          .then((response) => {
            this.rows = response.data.data;
            this.isShowHeaderButton = this.rows.length === 0;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onAdd() {
        this.passwordChanged = false;
        actionEdit.value = false;
        this.radcheck = {};
        this.password = null;
        this.confirm = null;
        this.radcheck.attribute = "Cleartext-Password";
        this.radcheck.op = ":=";
        this.create = true;
      },
      onEdit(row) {
        this.passwordChanged = false;
        actionEdit.value = true;
        this.radcheck = row;
        this.password = row.value;
        this.confirm = row.value;
        this.create = true;
      },
      async onDelete(row) {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to delete this item?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          const url = "/api/v1/admin/radius/user/" + row.id;
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
      async onSubmit() {
        if (!(this.password === this.confirm)) {
          $q.notify({
            type: "negative",
            message: "Passwords do not match.",
          });
          return;
        }
        this.create = false;
        if (this.passwordChanged) {
          //this.radcheck.value = Base64.stringify(SHA512(this.password));
          this.radcheck.value = this.password;
        }
        if (actionEdit.value) {
          await axios
            .post("/api/v1/admin/radius/user/edit", this.radcheck)
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
            .post("/api/v1/admin/radius/user/add", this.radcheck)
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
</style>
