<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Proxy Servers</q-item-label>
        </q-item>
        <q-list>
          <q-item>
            <q-item-section side>
              <q-icon name="dns" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Main Server</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="master.active"
              label="Active"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterActive()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="master.adblock"
              label="Ad blocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterAdBlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="master.cache"
              label="Cache"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterCache()"
            />
          </q-item>
          <q-item dense class="bot-line">
            <q-checkbox
              v-model="master.unlock"
              label="Website unblocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterUnlock()"
            />
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon name="dns" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Backup server</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slave.active"
              label="Active"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveActive()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slave.adblock"
              label="Ad blocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveAdBlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slave.cache"
              label="Cache"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveCache()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slave.unlock"
              label="Website unblocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveUnlock()"
            />
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const master = {
  active: false,
  master: false,
  adblock: false,
  cache: false,
  unlock: false,
};

const slave = {
  active: false,
  master: false,
  adblock: false,
  cache: false,
  unlock: false,
};

export default defineComponent({
  setup() {
    const $q = useQuasar();

    return {
      master: ref(master),
      slave: ref(slave),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 4 : $q.screen.name == "xs" ? 11 : 3}`
      ),
      async GetStateProxy() {
        await axios
          .get("/api/v1/admin/proxy/status/get")
          .then((response) => {
            if (response.data.data[0].master) {
              this.master = response.data.data[0];
              this.slave = response.data.data[1];
            } else {
              this.master = response.data.data[1];
              this.slave = response.data.data[0];
            }
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onMasterActive() {
        if (this.master.active) {
          await axios
            .put("/api/v1/admin/proxy/master/server/start")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/master/server/stop")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onMasterAdBlock() {
        if (this.master.adblock) {
          await axios
            .put("/api/v1/admin/proxy/master/adblock/on")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/master/adblock/off")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onMasterCache() {
        if (this.master.cache) {
          await axios
            .put("/api/v1/admin/proxy/master/cache/on")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/master/cache/off")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onMasterUnlock() {
        if (this.master.unlock) {
          await axios
            .put("/api/v1/admin/proxy/master/unlock/on")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/master/unlock/off")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onSlaveActive() {
        if (this.slave.active) {
          await axios
            .put("/api/v1/admin/proxy/slave/server/start")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/slave/server/stop")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onSlaveAdBlock() {
        if (this.slave.adblock) {
          await axios
            .put("/api/v1/admin/proxy/slave/adblock/on")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/slave/adblock/off")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onSlaveCache() {
        if (this.slave.cache) {
          await axios
            .put("/api/v1/admin/proxy/slave/cache/on")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/slave/cache/off")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        }
      },
      async onSlaveUnlock() {
        if (this.slave.unlock) {
          await axios
            .put("/api/v1/admin/proxy/slave/unlock/on")
            .then(() => {
              this.GetStateProxy();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        } else {
          await axios
            .put("/api/v1/admin/proxy/slave/unlock/off")
            .then(() => {
              this.GetStateProxy();
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
    await this.GetStateProxy();
  },
});
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
