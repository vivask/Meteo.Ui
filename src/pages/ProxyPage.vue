<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Серверы</q-item-label>
        </q-item>
        <q-list>
          <q-item>
            <q-item-section side>
              <q-icon name="dns" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Основной сервер</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="masterActive"
              label="Активен"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterActive()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="masterAdBlock"
              label="Блокировка рекламы"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterAdBlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="masterCache"
              label="Кэш"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onMasterCache()"
            />
          </q-item>
          <q-item dense class="bot-line">
            <q-checkbox
              v-model="masterUnlock"
              label="Деблокировка сайтов"
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
              <q-item-label class="text-bold">Резервный сервер</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slaveActive"
              label="Активен"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveActive()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slaveAdBlock"
              label="Блокировка рекламы"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveAdBlock()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slaveCache"
              label="Кэш"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              class="ml-30"
              @update:model-value="onSlaveCache()"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
              v-model="slaveUnlock"
              label="Деблокировка сайтов"
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

export default defineComponent({
  setup() {
    const $q = useQuasar();

    const masterActive = ref(false);
    const masterAdBlock = ref(false);
    const masterCache = ref(false);
    const masterUnlock = ref(false);
    const slaveActive = ref(false);
    const slaveAdBlock = ref(false);
    const slaveCache = ref(false);
    const slaveUnlock = ref(false);

    return {
      masterActive,
      masterAdBlock,
      masterCache,
      masterUnlock,
      slaveActive,
      slaveAdBlock,
      slaveCache,
      slaveUnlock,
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 4 : $q.screen.name == "xs" ? 11 : 3}`
      ),
      async GetStateProxy() {
        await axios
          .get("/api/v1/admin/proxy/status/get")
          .then((response) => {
            if (response.data.data[0].master) {
              this.SetStateProxy(response.data.data[0], response.data.data[1]);
            } else {
              this.SetStateProxy(response.data.data[1], response.data.data[0]);
            }
          })
          .catch(() => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      SetStateProxy(master, slave) {
        masterActive.value = master.active;
        masterAdBlock.value = master.blkliston;
        masterCache.value = master.cacheon;
        masterUnlock.value = master.unlockeron;
        slaveActive.value = slave.active;
        slaveAdBlock.value = slave.blkliston;
        slaveCache.value = slave.cacheon;
        slaveUnlock.value = slave.unlockeron;
      },
      async onMasterActive() {
        if (masterActive.value) {
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
        if (masterAdBlock.value) {
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
        if (masterCache.value) {
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
        if (masterUnlock.value) {
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
        if (slaveActive.value) {
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
        if (slaveAdBlock.value) {
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
        if (slaveCache.value) {
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
        if (slaveUnlock.value) {
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
  methods: {},
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
