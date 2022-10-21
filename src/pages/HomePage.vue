<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div
        class="q-ml-sm bg-blue-grey-9 rounded-borders shadow-8"
        :class="cols"
      >
        <div
          v-ripple
          class="relative-position container cursor-pointer q-hoverable"
          @mouseover="bme280Hover = true"
          @mouseleave="bme280Hover = false"
          @click.prevent="prevent"
        >
          <q-item dense>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="bme280Icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-h6" :color="bme280Color"
                >BME280</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Температура: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.bmx280_tempr"
                :color="bme280ValueColor"
                >{{
                  parseFloat(peripheral.bmx280_tempr).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>°C</q-item-label>
            </q-item-section>
            <q-item-section
              side
              v-if="
                peripheral.max_bmx280_tempr_alarm ||
                peripheral.min_bmx280_tempr_alarm
              "
            >
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="bme280TemperatureClick"
              />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Давлeние: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.bmx280_press"
                :color="bme280ValueColor"
                >{{
                  parseFloat(peripheral.bmx280_press).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>mmHg</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Влажность: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.bmx280_hum"
                :color="bme280ValueColor"
                >{{
                  parseFloat(peripheral.bmx280_hum).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>%</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs'"></div>
      <div
        class="q-ml-sm square bg-blue-grey-9 rounded-borders shadow-8"
        :class="cols"
      >
        <div
          v-ripple
          class="relative-position container cursor-pointer q-hoverable"
          @mouseover="mics6814Hover = true"
          @mouseleave="mics6814Hover = false"
          @click.prevent="prevent"
        >
          <q-item dense>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="mics6814Icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-h6" :color="mics6814Color"
                >MICS6814</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>NH3: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.mics6814_nh3"
                :color="mics6814ValueColor"
                >{{
                  parseFloat(peripheral.mics6814_nh3).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мг/м3</q-item-label>
            </q-item-section>
            <q-item-section side v-if="peripheral.max_6814_nh3_alarm">
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="mics6814NH3Click"
              />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>NO2: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.mics6814_no2"
                :color="mics6814ValueColor"
                >{{
                  parseFloat(peripheral.mics6814_no2).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мг/м3</q-item-label>
            </q-item-section>
            <q-item-section side v-if="peripheral.max_6814_no2_alarm">
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="mics6814NO2Click"
              />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>CO: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.mics6814_co"
                :color="mics6814ValueColor"
                >{{
                  parseFloat(peripheral.mics6814_co).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мг/м3</q-item-label>
            </q-item-section>
            <q-item-section side v-if="peripheral.max_6814_co_alarm">
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="mics6814COClick"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div
        class="flex-break"
        v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'"
      ></div>
      <div
        class="q-ml-sm square bg-blue-grey-9 rounded-borders shadow-8"
        :class="cols"
      >
        <div
          v-ripple
          class="relative-position container cursor-pointer q-hoverable"
          @mouseover="radsensHover = true"
          @mouseleave="radsensHover = false"
          @click.prevent="prevent"
        >
          <q-item dense>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="radsensIcon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-h6" :color="radsensColor"
                >RadSens</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Статич. ИИ: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.radsens_static"
                :color="radsensValueColor"
                >{{
                  parseFloat(peripheral.radsens_static).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мкР/ч</q-item-label>
            </q-item-section>
            <q-item-section side v-if="peripheral.max_rad_stat_alarm">
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="radsensStaticClick"
              />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Динамич. ИИ: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.radsens_dynamic"
                :color="radsensValueColor"
                >{{
                  parseFloat(peripheral.radsens_dynamic).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мкР/ч</q-item-label>
            </q-item-section>
            <q-item-section side v-if="peripheral.max_rad_dyn_alarm">
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="radsensDynamicClick"
              />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Генератор: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-100">
              <q-btn
                dense
                color="primary"
                size="xs"
                :label="radsensHVState"
                @click.stop="radsensHVClick"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div
        class="flex-break"
        v-if="$q.screen.name == 'xs' || $q.screen.name == 'xl'"
      ></div>
      <div
        class="q-ml-sm square bg-blue-grey-9 rounded-borders shadow-8"
        :class="cols"
      >
        <div
          v-ripple
          class="relative-position container cursor-pointer q-hoverable"
          @mouseover="ds18b20Hover = true"
          @mouseleave="ds18b20Hover = false"
          @click.prevent="prevent"
        >
          <q-item dense>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="ds18b20Icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-h6" :color="ds18b20Color"
                >DS18B20</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Температура: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.ds18b20_tempr"
                :color="ds18b20ValueColor"
                >{{
                  parseFloat(peripheral.ds18b20_tempr).toFixed(1)
                }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>°C</q-item-label>
            </q-item-section>
            <q-item-section
              side
              v-if="
                peripheral.max_ds18b20_alarm || peripheral.min_ds18b20_alarm
              "
            >
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="ds18b20TemperatureClick"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div
        class="flex-break"
        v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'"
      ></div>
      <div
        class="q-ml-sm square bg-blue-grey-9 rounded-borders shadow-8"
        :class="cols"
      >
        <div
          v-ripple
          class="relative-position container cursor-pointer q-hoverable"
          @mouseover="ze08ch2oHover = true"
          @mouseleave="ze08ch2oHover = false"
          @click.prevent="prevent"
        >
          <q-item dense>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img :src="ze08ch2oIcon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-h6" :color="ze08ch2oColor"
                >ZE08CH2O</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>CH2O: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label
                v-model="peripheral.ze08_ch2o"
                :color="ze08ch2oValueColor"
                >{{ parseFloat(peripheral.ze08_ch2o).toFixed(1) }}</q-item-label
              >
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>°C</q-item-label>
            </q-item-section>
            <q-item-section side v-if="peripheral.max_ch2o_alarm">
              <q-btn
                dense
                round
                color="pink"
                size="xs"
                icon="mdi-check"
                @click.stop="ze08ch2oValueClick"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs'"></div>
      <div class="q-ml-sm" :class="cols"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { useEsp32Store } from "src/stores/esp32";

const peripheral = {
  bmx280_press: null,
  bmx280_tempr: null,
  bmx280_hum: null,
  max_bmx280_tempr_alarm: null,
  min_bmx280_tempr_alarm: null,
  bmx280_created: null,
  ds18b20_tempr: null,
  max_ds18b20_alarm: null,
  min_ds18b20_alarm: null,
  ds18b20_created: null,
  mics6814_no2: null,
  mics6814_nh3: null,
  mics6814_co: null,
  max_6814_nh3_alarm: null,
  max_6814_co_alarm: null,
  max_6814_no2_alarm: null,
  mics6814_created: null,
  radsens_dynamic: null,
  radsens_static: null,
  radsens_pulse: null,
  max_rad_stat_alarm: null,
  max_rad_dyn_alarm: null,
  radsens_hv_state: null,
  radsens_created: null,
  ze08_ch2o: null,
  max_ch2o_alarm: null,
  ze08_created: null,
  esp32_date_time_now: null,
};

export default {
  setup() {
    let timer;

    const $q = useQuasar();
    const store = useEsp32Store();

    const iconColor = "#3092EA";

    const bme280Hover = ref(false);
    const bme280WhiteIcon = new URL(
      "../assets/humidity-48x48-white.png",
      import.meta.url
    ).href;
    const bme280BlueIcon = new URL(
      "../assets/humidity-48x48-blue.png",
      import.meta.url
    ).href;
    const bme280ValueColor = ref("white");

    const mics6814Hover = ref(false);
    const mics6814WhiteIcon = new URL(
      "../assets/NH3-48x48-white.png",
      import.meta.url
    ).href;
    const mics6814BlueIcon = new URL(
      "../assets/NH3-48x48-blue.png",
      import.meta.url
    ).href;
    const mics6814ValueColor = ref("white");

    const radsensHover = ref(false);
    const radsensWhiteIcon = new URL(
      "../assets/Radiation-48x48-white.png",
      import.meta.url
    ).href;
    const radsensBlueIcon = new URL(
      "../assets/Radiation-48x48-blue.png",
      import.meta.url
    ).href;
    const radsensValueColor = ref("white");

    const ds18b20Hover = ref(false);
    const ds18b20WhiteIcon = new URL(
      "../assets/temperature-48x48-white.png",
      import.meta.url
    ).href;
    const ds18b20BlueIcon = new URL(
      "../assets/temperature-48x48-blue.png",
      import.meta.url
    ).href;
    const ds18b20ValueColor = ref("white");

    const ze08ch2oHover = ref(false);
    const ze08ch2oWhiteIcon = new URL(
      "../assets/CH2O-48x48-white.png",
      import.meta.url
    ).href;
    const ze08ch2oBlueIcon = new URL(
      "../assets/CH2O-48x48-blue.png",
      import.meta.url
    ).href;
    const ze08ch2oValueColor = ref("white");

    onMounted(() => {
      timer = setInterval(() => {
        store.calc_esp32_peripheral().catch((err) => {
          $q.notify({ type: "negative", message: err.response.data.message });
        });
      }, 1000);
    });

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      peripheral: computed(() => store.get_esp32_peripheral),
      bme280IsActive: computed(() => store.get_bme280_state),
      bme280Hover,
      bme280Icon: computed(() =>
        bme280Hover.value ? bme280BlueIcon : bme280WhiteIcon
      ),
      bme280Color: computed(() => (bme280Hover.value ? iconColor : "white")),
      bme280ValueColor,

      mics6814IsActive: computed(() => store.get_mics6814_state),
      mics6814Hover,
      mics6814Icon: computed(() =>
        mics6814Hover.value ? mics6814BlueIcon : mics6814WhiteIcon
      ),
      mics6814Color: computed(() =>
        mics6814Hover.value ? iconColor : "white"
      ),
      mics6814ValueColor,

      radsensIsActive: computed(() => store.get_radsens_state),
      radsensHover,
      radsensIcon: computed(() =>
        radsensHover.value ? radsensBlueIcon : radsensWhiteIcon
      ),
      radsensColor: computed(() => (radsensHover.value ? iconColor : "white")),
      radsensValueColor,
      radsensHVState: computed(() =>
        peripheral.radsens_hv_state ? "On" : "Off"
      ),

      ds18b20IsActive: computed(() => store.get_ds18b20_state),
      ds18b20Hover,
      ds18b20Icon: computed(() =>
        ds18b20Hover.value ? ds18b20BlueIcon : ds18b20WhiteIcon
      ),
      ds18b20Color: computed(() => (ds18b20Hover.value ? iconColor : "white")),
      ds18b20ValueColor,

      ze08ch2oIsActive: computed(() => store.get_ze08ch2o_state),
      ze08ch2oHover,
      ze08ch2oIcon: computed(() =>
        ze08ch2oHover.value ? ze08ch2oBlueIcon : ze08ch2oWhiteIcon
      ),
      ze08ch2oColor: computed(() =>
        ze08ch2oHover.value ? iconColor : "white"
      ),
      ze08ch2oValueColor,

      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 4 : $q.screen.name == "xs" ? 11 : 3}`
      ),
    };
  },

  methods: {
    prevent: function () {
      console.log("prevent");
    },
    mics6814COClick: function () {
      console.log("mics6814COClick");
    },
    mics6814NO2Click: function () {
      console.log("mics6814COClick");
    },
    mics6814NH3Click: function () {
      console.log("mics6814NH3Click");
    },
    bme280TemperatureClick: function () {
      console.log("bme280TemperatureClick");
    },
    radsensStaticClick: function () {
      console.log("radsensStaticClick");
    },
    radsensDynamicClick: function () {
      console.log("radsensStaticClick");
    },
    radsensHVClick: function () {
      console.log("radsensHVClick");
    },
    ds18b20TemperatureClick: function () {
      console.log("ds18b20TemperatureClick");
    },
    ze08ch2oValueClick: function () {
      console.log("ze08ch2oValueClick");
    },
  },
};
</script>

<style lang="sass" scoped>
.square
  background: rgba(86, 61, 124, .15)
  border: 1px solid rgba(86, 61, 124, .2)
.row > div
  //border: 1px solid rgba(86,61,124,.2)
.flex-break
  flex: 1 0 100% !important
  margin-top: 10px
  height: 0 !important
</style>
