<template>
  <div class="q-pa-md" v-if="loaded && !error">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Proxy Servers</q-item-label>
        </q-item>
        <q-list>
          <q-item dense>
            <q-checkbox
              v-model="main.active"
              label="Main server"
              checked-icon="dns"
              unchecked-icon="dns"
              @update:model-value="onMainActive()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="main.adblock"
              label="Ad blocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMainAdBlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="main.cache"
              label="Cache"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMainCache()"
            />
          </q-item>
          <q-item dense class="bot-line">
            <q-checkbox
              v-model="main.unlock"
              label="Website unblocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMainUnlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="backup.active"
              label="Backup server"
              checked-icon="dns"
              unchecked-icon="dns"
              @update:model-value="onBackupActive()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="backup.adblock"
              label="Ad blocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onBackupAdBlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="backup.cache"
              label="Cache"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onBackupCache()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="backup.unlock"
              label="Website unblocking"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onBackupUnlock()"
            />
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

  <UiContainer v-if="!loaded">
    <UiSpinner></UiSpinner>
  </UiContainer>

  <UiContainer v-if="error">
    <UiAlert>{{ message }}</UiAlert>
  </UiContainer>
</template>

<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import UiContainer from "src/components/UiContainer.vue";
import UiAlert from "src/components/UiAlert.vue";
import UiSpinner from "src/components/UiSpinner.vue";

const main = {
  active: false,
  main: false,
  adblock: false,
  cache: false,
  unlock: false,
};

const backup = {
  active: false,
  main: false,
  adblock: false,
  cache: false,
  unlock: false,
};

export default {
  components: {
    UiContainer,
    UiAlert,
    UiSpinner,
  },

  setup() {
    const $q = useQuasar();

    return {
      loaded: ref(false),
      error: ref(false),
      message: ref(null),
      main: ref(main),
      backup: ref(backup),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 4 : $q.screen.name == "xs" ? 11 : 3}`
      ),
      async GetStateProxy() {
        this.loaded = false;
        this.error = false;
        this.message = null;
        await axios
          .get("/api/v1/proxy/status/get")
          .then((response) => {
            if (response.data.data[0].main) {
              this.main = response.data.data[0];
              this.backup = response.data.data[1];
            } else {
              this.main = response.data.data[1];
              this.backup = response.data.data[0];
            }
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
      async onMainActive() {
        if (this.main.active) {
          await axios
            .put("/api/v1/proxy/main/server/start")
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
          axios
            .put("/api/v1/proxy/main/server/stop")
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
      async onMainAdBlock() {
        if (this.main.adblock) {
          await axios
            .put("/api/v1/proxy/main/adblock/on")
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
            .put("/api/v1/proxy/main/adblock/off")
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
      async onMainCache() {
        if (this.main.cache) {
          await axios
            .put("/api/v1/proxy/main/cache/on")
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
            .put("/api/v1/proxy/main/cache/off")
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
      async onMainUnlock() {
        if (this.main.unlock) {
          await axios
            .put("/api/v1/proxy/main/unlock/on")
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
            .put("/api/v1/proxy/main/unlock/off")
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
      async onBackupActive() {
        if (this.backup.active) {
          await axios
            .put("/api/v1/proxy/backup/server/start")
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
          axios
            .put("/api/v1/proxy/backup/server/stop")
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
      async onBackupAdBlock() {
        if (this.backup.adblock) {
          await axios
            .put("/api/v1/proxy/backup/adblock/on")
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
            .put("/api/v1/proxy/backup/adblock/off")
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
      async onBackupCache() {
        if (this.backup.cache) {
          await axios
            .put("/api/v1/proxy/backup/cache/on")
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
            .put("/api/v1/proxy/backup/cache/off")
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
      async onBackupUnlock() {
        if (this.backup.unlock) {
          await axios
            .put("/api/v1/proxy/backup/unlock/on")
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
            .put("/api/v1/proxy/backup/unlock/off")
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
