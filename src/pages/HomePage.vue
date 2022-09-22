<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div
      class="q-ml-sm square rounded-borders"
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
            <q-item-label class="text-bold text-h6" :color="bme280Color">BME280</q-item-label>
          </q-item-section>
        </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Температура: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label v-model="bme280Temperature" :color="bme280ValueColor">{{bme280Temperature}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>°C</q-item-label>
            </q-item-section>
            <q-item-section side v-if="bme280TemperatureAlert">
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
              <q-item-label v-model="bme280Pressure" :color="bme280ValueColor">{{bme280Pressure}}</q-item-label>
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
              <q-item-label v-model="bme280Humidity" :color="bme280ValueColor">{{bme280Humidity}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>%</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs'"></div>
      <div
      class="q-ml-sm square rounded-borders"
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
              <q-item-label  class="text-bold text-h6" :color="mics6814Color">MICS6814</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>NH3: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label v-model="mics6814NH3" :color="mics6814ValueColor">{{mics6814NH3}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мг/м3</q-item-label>
            </q-item-section>
            <q-item-section side v-if="mics6814NH3Alert">
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
              <q-item-label v-model="mics6814NO2" :color="mics6814ValueColor">{{mics6814NO2}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мг/м3</q-item-label>
            </q-item-section>
            <q-item-section side v-if="mics6814NO2Alert">
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
              <q-item-label v-model="mics6814CO" :color="mics6814ValueColor">{{mics6814CO}}</q-item-label>
            </q-item-section>
            <q-item-section  class="wd-50">
              <q-item-label>мг/м3</q-item-label>
            </q-item-section>
            <q-item-section side v-if="mics6814COAlert">
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
      <div class="flex-break" v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'"></div>
      <div
      class="q-ml-sm square rounded-borders"
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
              <q-item-label  class="text-bold text-h6" :color="radsensColor">RadSens</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Статич. ИИ: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label v-model="radsensStatic" :color="radsensValueColor">{{radsensStatic}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мкР/ч</q-item-label>
            </q-item-section>
            <q-item-section side v-if="radsensStaticAlert">
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
              <q-item-label v-model="radsensDynamic" :color="radsensValueColor">{{radsensDynamic}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>мкР/ч</q-item-label>
            </q-item-section>
            <q-item-section side v-if="radsensDynamicAlert">
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
            <q-item-section  class="wd-100">
              <q-btn
              dense
              color='primary'
              size="xs"
              label="Включен"
              @click.stop="radsensHVClick"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs' || $q.screen.name == 'xl'"></div>
      <div
      class="q-ml-sm square rounded-borders"
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
              <q-item-label class="text-bold text-h6" :color="ds18b20Color">DS18B20</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>Температура: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label v-model="ds18b20Temperature" :color="ds18b20ValueColor">{{ds18b20Temperature}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>°C</q-item-label>
            </q-item-section>
            <q-item-section side v-if="ds18b20TemperatureAlert">
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
      <div class="flex-break" v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'"></div>
      <div
      class="q-ml-sm square rounded-borders"
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
              <q-item-label class="text-bold text-h6" :color="ze08ch2oColor">ZE08CH2O</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section class="wd-120">
              <q-item-label>CH2O: </q-item-label>
            </q-item-section>
            <q-item-section class="wd-50 text-right">
              <q-item-label v-model="ze08ch2oValue" :color="ze08ch2oValueColor">{{ze08ch2oValue}}</q-item-label>
            </q-item-section>
            <q-item-section class="wd-50">
              <q-item-label>°C</q-item-label>
            </q-item-section>
            <q-item-section side v-if="ze08ch2oAlert">
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
      <div
      class="q-ml-sm"
      :class="cols"
      >
      </div>
    </div>
  </div></template>

<script>

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup () {

    let timer

    const $q = useQuasar()

    const iconColor = '#3092EA'

    const bme280IsActive = ref(true)
    const bme280Hover = ref(false)
    const bme280WhiteIcon = new URL('../assets/humidity-48x48-white.png', import.meta.url).href
    const bme280BlueIcon = new URL('../assets/humidity-48x48-blue.png', import.meta.url).href
    const bme280TemperatureAlert = ref(true)
    const bme280ValueColor = ref('white')

    const mics6814IsActive = ref(true)
    const mics6814Hover = ref(false)
    const mics6814WhiteIcon = new URL('../assets/NH3-48x48-white.png', import.meta.url).href
    const mics6814BlueIcon = new URL('../assets/NH3-48x48-blue.png', import.meta.url).href
    const mics6814NH3Alert = ref(true)
    const mics6814NO2Alert = ref(true)
    const mics6814COAlert = ref(true)
    const mics6814ValueColor = ref('white')

    const radsensIsActive = ref(true)
    const radsensHover = ref(false)
    const radsensWhiteIcon = new URL('../assets/Radiation-48x48-white.png', import.meta.url).href
    const radsensBlueIcon = new URL('../assets/Radiation-48x48-blue.png', import.meta.url).href
    const radsensStaticAlert = ref(true)
    const radsensDynamicAlert  = ref(true)
    const radsensValueColor = ref('white')

    const ds18b20IsActive = ref(true)
    const ds18b20Hover = ref(false)
    const ds18b20WhiteIcon = new URL('../assets/temperature-48x48-white.png', import.meta.url).href
    const ds18b20BlueIcon = new URL('../assets/temperature-48x48-blue.png', import.meta.url).href
    const ds18b20TemperatureAlert = ref(true)
    const ds18b20ValueColor = ref('white')

    const ze08ch2oIsActive = ref(true)
    const ze08ch2oHover = ref(false)
    const ze08ch2oWhiteIcon = new URL('../assets/CH2O-48x48-white.png', import.meta.url).href
    const ze08ch2oBlueIcon = new URL('../assets/CH2O-48x48-blue.png', import.meta.url).href
    const ze08ch2oAlert = ref(true)
    const ze08ch2oValueColor = ref('white')

    onMounted(() => {
      timer = setInterval(() => {
        //index.value = (index.value + 1) % colors.length
        //color.value = colors[ index.value ]
      }, 3000)
    })

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      bme280IsActive,
      bme280Hover,
      bme280Icon: computed(() => bme280Hover.value ? bme280BlueIcon : bme280WhiteIcon),
      bme280Color: computed(() => bme280Hover.value ? iconColor : 'white'),
      bme280Temperature: ref('FF.F'),
      bme280Pressure:  ref('FFF'),
      bme280Humidity: ref('FF'),
      bme280TemperatureAlert,
      bme280ValueColor,

      mics6814IsActive,
      mics6814Hover,
      mics6814Icon: computed(() => mics6814Hover.value ? mics6814BlueIcon : mics6814WhiteIcon),
      mics6814Color: computed(() => mics6814Hover.value ? iconColor : 'white'),
      mics6814NH3: ref('FF.F'),
      mics6814NO2: ref('FF.F'),
      mics6814CO: ref('FF.F'),
      mics6814NH3Alert,
      mics6814NO2Alert,
      mics6814COAlert,
      mics6814ValueColor,

      radsensIsActive,
      radsensHover,
      radsensIcon: computed(() => radsensHover.value ? radsensBlueIcon : radsensWhiteIcon),
      radsensColor: computed(() => radsensHover.value ? iconColor : 'white'),
      radsensStatic: ref('FF.F'),
      radsensDynamic: ref('FF.F'),
      radsensStaticAlert,
      radsensDynamicAlert,
      radsensValueColor,

      ds18b20IsActive,
      ds18b20Hover,
      ds18b20Icon: computed(() => ds18b20Hover.value ? ds18b20BlueIcon : ds18b20WhiteIcon),
      ds18b20Color: computed(() => ds18b20Hover.value ? iconColor : 'white'),
      ds18b20Temperature: ref('FF.F'),
      ds18b20TemperatureAlert,
      ds18b20ValueColor,

      ze08ch2oIsActive,
      ze08ch2oHover,
      ze08ch2oIcon: computed(() => ze08ch2oHover.value ? ze08ch2oBlueIcon : ze08ch2oWhiteIcon),
      ze08ch2oColor: computed(() => ze08ch2oHover.value ? iconColor : 'white'),
      ze08ch2oValue: ref('FF.F'),
      ze08ch2oAlert,
      ze08ch2oValueColor,

      cols: computed(() => `col-${($q.screen.name=='sm') ? 4 : ($q.screen.name=='xs') ? 11 : 3}`)
    }

  },

  methods: {
    prevent: function() {
      console.log('prevent')
    },
    mics6814COClick: function() {
      console.log('mics6814COClick')
    },
    mics6814NO2Click: function() {
      console.log('mics6814COClick')
    },
    mics6814NH3Click: function() {
      console.log('mics6814NH3Click')
    },
    bme280TemperatureClick: function() {
      console.log('bme280TemperatureClick')
    },
    radsensStaticClick: function() {
      console.log('radsensStaticClick')
    },
    radsensDynamicClick: function() {
      console.log('radsensStaticClick')
    },
    radsensHVClick: function() {
      console.log('radsensHVClick')
    },
    ds18b20TemperatureClick: function() {
      console.log('ds18b20TemperatureClick')
    },
    ze08ch2oValueClick: function() {
      console.log('ze08ch2oValueClick')
    },
  },
}
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
