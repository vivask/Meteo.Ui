<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="mdi-menu" class="q-mr-sm" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Meteo
        </q-toolbar-title>

        <q-btn stretch flat to="/login" v-if="!isAuthenticated">Login</q-btn>
        <q-btn stretch flat @click="logout" v-else>Logout</q-btn>

        <q-btn flat round dense icon="mdi-dots-vertical" >
          <q-menu>
            <q-list>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                  v-model="mainFilter"
                  val="avg"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  @click="triggerMainOptions" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Average</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                  v-model="mainFilter"
                  val="min"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  @click="triggerMainOptions" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Minimum</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                  v-model="mainFilter"
                  val="max"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  @click="triggerMainOptions" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Maximum</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                  v-model="mainFilter"
                  val="all"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  @click="triggerMainOptions" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>All</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      class="bg-grey-3"
    >

      <q-list>
        <q-item-label header >Menu</q-item-label>

        <q-item
        active-class="menu-item"
        clickable
        v-close-popup
        href="#/"
        :active="activeHome"
        @click="setMenu('Home', '')"
        >
          <q-item-section side>
            <q-icon name="mdi-home" color="blue"/>
          </q-item-section>
          <q-item-section>
            <q-item-label  class="ml-15">Home</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-expansion-item expand-separator v-model="peripheral">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="blue" name="sensors" />
          </q-item-section>
          <q-item-section>
            Peripheral
          </q-item-section>
        </template>
        <q-expansion-item
        label="BME280"
        v-model="bme280"
        switch-toggle-side
        dense-toggle
        >
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorBme280Temperature"
            :href="getRef('bme280', 'temperature')"
            @click="setMenu('bme280', 'temperature')"
            >
              <q-item-section>
                <q-item-label>Temperature</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-thermometer" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorBme280Pressure"
            :href="getRef('bme280', 'pressure')"
            @click="setMenu('bme280', 'pressure')"
            >
              <q-item-section>
                <q-item-label>Pressure</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-gauge" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorBme280Humidity"
            :href="getRef('bme280', 'humidity')"
            @click="setMenu('bme280', 'humidity')"
            >
              <q-item-section>
                <q-item-label>Humidity</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-water-percent" />
              </q-item-section>
            </q-item>
        </q-expansion-item>
        <q-expansion-item
        label="MICS6814"
        v-model="mics6814"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorMics6814NO2"
            :href="getRef('mics6814', 'no2')"
            @click="setMenu('mics6814', 'no2')"
            >
              <q-item-section>
                <q-item-label>NO2</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-gas-cylinder" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorMics6814NH3"
            :href="getRef('mics6814', 'nh3')"
            @click="setMenu('mics6814', 'nh3')"
            >
              <q-item-section>
                <q-item-label>NH3</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-gas-cylinder" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="RadSens"
        v-model="radsens"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorRadSensStatic"
            :href="getRef('radsens', 'static')"
            @click="setMenu('radsens', 'static')"
            >
              <q-item-section>
                <q-item-label>Static</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-radioactive" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorRadSensDynamic"
            :href="getRef('radsens', 'dynamic')"
            @click="setMenu('radsens', 'dynamic')"
            >
              <q-item-section>
                <q-item-label>Dynamic</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-radioactive" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="ZE08CH2O"
        v-model="ze08ch2o"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorZe08ch2o"
            :href="getRef('ze08ch2o', 'ch2o')"
            @click="setMenu('radsens', 'ch2o')"
            >
              <q-item-section>
                <q-item-label>CH2O</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-gas-cylinder" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="DS18B20"
        v-model="ds18b20"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="sensorZe08ch2o"
            :href="getRef('ds18b20', 'temperature')"
            @click="setMenu('ds18b20', 'temperature')"
            >
              <q-item-section>
                <q-item-label>Temperature</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-thermometer" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-expansion-item>

      <q-expansion-item
      v-model="esp32"
      v-if="isAuthenticated"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="blue" name="mdi-memory" />
          </q-item-section>
          <q-item-section>
            Controller
          </q-item-section>
        </template>
        <q-list>
          <q-item
          active-class="menu-item"
          class="sub-menu-item"
          clickable
          v-close-popup
          :active="esp32Settings"
          :href="getRef('esp32', 'settings')"
          @click="setMenu('esp32', 'settings')"
          >
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-icon name="mdi-cog-box" />
              </q-item-section>
          </q-item>
          <q-item
          active-class="menu-item"
          class="sub-menu-item"
          clickable
          v-close-popup
          :active="esp32Alarm"
          :href="getRef('esp32', 'alarm')"
          @click="setMenu('esp32', 'alarm')"
          >
            <q-item-section>
              <q-item-label>Alarm</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-icon name="notifications" />
              </q-item-section>
          </q-item>
          <q-item
          active-class="menu-item"
          class="sub-menu-item"
          clickable
          v-close-popup
          :active="esp32Journal"
          :href="getRef('esp32', 'journal')"
          @click="setMenu('esp32', 'journal')"
          >
            <q-item-section>
              <q-item-label>Journal</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-icon name="mdi-history" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-expansion-item
      v-model="services"
      expand-separator
      v-if="isAuthenticated"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="blue" name="settings_suggest" />
          </q-item-section>
          <q-item-section>
            Services
          </q-item-section>
        </template>
        <q-expansion-item
        label="Proxy"
        v-model="proxy"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="proxyServers"
            :href="getRef('proxy', 'servers')"
            @click="setMenu('proxy', 'servers')"
            >
              <q-item-section>
                <q-item-label>Servers</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-server-network" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="proxyZones"
            :href="getRef('proxy', 'zones')"
            @click="setMenu('proxy', 'zones')"
            >
              <q-item-section>
                <q-item-label>Locale zones</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-lan" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="proxyAutoVPN"
            :href="getRef('proxy', 'autovpn')"
            @click="setMenu('proxy', 'autovpn')"
            >
              <q-item-section>
                <q-item-label>Auto VPN</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-playlist-check" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="proxyManualVPN"
            :href="getRef('proxy', 'manualvpn')"
            @click="setMenu('proxy', 'manualvpn')"
            >
              <q-item-section>
                <q-item-label>Manual VPN</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-playlist-star" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="proxyIgnoreVPN"
            :href="getRef('proxy', 'ignorevpn')"
            @click="setMenu('proxy', 'ignorevpn')"
            >
              <q-item-section>
                <q-item-label>Ignore VPN</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-playlist-remove" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="Schedule"
        v-model="schedule"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="scheduleTimetable"
            :href="getRef('schedule', 'timetable')"
            @click="setMenu('schedule', 'timetable')"
            >
              <q-item-section>
                <q-item-label>Timetable</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="pending_actions" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="scheduleTasks"
            :href="getRef('schedule', 'tasks')"
            @click="setMenu('schedule', 'tasks')"
            >
              <q-item-section>
                <q-item-label>Tasks</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="task" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="scheduleCron"
            :href="getRef('schedule', 'cron')"
            @click="setMenu('schedule', 'cron')"
            >
              <q-item-section>
                <q-item-label>Cron</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-book-clock-outline" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="Secure"
        v-model="secure"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="secureSshKeys"
            :href="getRef('secure', 'sshkeys')"
            @click="setMenu('secure', 'sshkeys')"
            >
              <q-item-section>
                <q-item-label>SSH Keys</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-key-variant" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="secureSshHosts"
            :href="getRef('secure', 'sshhosts')"
            @click="setMenu('secure', 'sshhosts')"
            >
              <q-item-section>
                <q-item-label>SSH Hosts</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-lan-pending" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="secureGitKeys"
            :href="getRef('secure', 'gitkeys')"
            @click="setMenu('secure', 'gitkeys')"
            >
              <q-item-section>
                <q-item-label>Git Keys</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-key-variant" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="secureGitHosts"
            :href="getRef('secure', 'githosts')"
            @click="setMenu('secure', 'githosts')"
            >
              <q-item-section>
                <q-item-label>Git Hosts</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-lan-pending" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="Database"
        v-model="database"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="databaseTables"
            :href="getRef('database', 'tables')"
            @click="setMenu('database', 'tables')"
            >
              <q-item-section>
                <q-item-label>Tables</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-table-large" />
              </q-item-section>
            </q-item>
            <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="databaseSync"
            :href="getRef('database', 'sync')"
            @click="setMenu('database', 'sync')"
            >
              <q-item-section>
                <q-item-label>Sync</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="sync" />
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>
        <q-expansion-item
        label="Servers"
        v-model="servers"
        switch-toggle-side
        dense-toggle
        >
          <q-list>
            <q-item
              active-class="menu-item"
              class="sub-menu-item"
              clickable
              v-close-popup
              :active="serverXU4"
              :href="getRef('servers', 'xu4')"
              @click="setMenu('servers', 'xu4')"
              >
                <q-item-section>
                  <q-item-label>Master (XU4)</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-server-network" />
                </q-item-section>
              </q-item>
              <q-item
              active-class="menu-item"
              class="sub-menu-item"
              clickable
              v-close-popup
              :active="serverN2"
              :href="getRef('servers', 'n2')"
              @click="setMenu('servers', 'n2')"
              >
                <q-item-section>
                  <q-item-label>Slave (N2)</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-server-network" />
                </q-item-section>
              </q-item>
          </q-list>
        </q-expansion-item>
      </q-expansion-item>
    </q-drawer>
    <q-footer elevated>
        <q-toolbar>
          <q-spinner-bars color="primary" size="2em" v-if="isActivePeripheral"/>
        </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

  <q-dialog
  v-model="loadInner"
  maximized
  >
    <LoadInner/>
  </q-dialog>

  <q-dialog
  v-model="gearInner"
  maximized
  >
    <GearInner/>
  </q-dialog>


</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useAuthStore } from 'src/stores/auth'
import LoadInner from 'components/LoadInner.vue'
import GearInner from 'components/GearInner.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {
    LoadInner,
    GearInner
  },

  setup () {

    let timer

    const store = useLayoutStore()
    const auth = useAuthStore()
    const $router = useRouter()

    const leftDrawerOpen = ref(false)
    const mainFilter = ref('avg')
    const isActivePeripheral = ref(false)
    const peripheral = ref(false)
    const bme280 = ref(false)
    const mics6814 = ref(false)
    const radsens = ref(false)
    const ze08ch2o = ref(false)
    const ds18b20 = ref(false)
    const esp32 = ref(false)
    const services = ref(false)
    const proxy = ref(false)
    const schedule = ref(false)
    const secure = ref(false)
    const database = ref(false)
    const servers = ref(false)

    onMounted(() => {
      auth.init()
      const path = store.current_path.split('/')
      let menu, submenu
      if(path.length > 2){
        menu = path[1]
        submenu = path[2]
      }else{
        menu="/"
        submenu = ""
      }
      store.set_selected_menu(menu)
      store.set_selected_submenu(submenu)

      if(submenu.length > 0){
        console.log(menu)
        eval(menu).value = true
        let parent = ''
        switch(menu){
          case 'bme280':
          case 'mics6814':
          case 'radsens':
          case 'ze08ch2o':
          case 'ds18b20':
            parent = 'peripheral'
            break
          case 'proxy':
          case 'schedule':
          case 'secure':
          case 'database':
          case 'servers':
            parent = 'services'
            break
        }
        if(parent.length > 0){
          console.log(parent)
          eval(parent).value = true
        }
      }

      timer = setInterval(() => {
        //index.value = (index.value + 1) % colors.length
        //color.value = colors[ index.value ]
      }, 3000)
    })

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      isAuthenticated: computed(() => auth.isAuthenticated),
      leftDrawerOpen,
      mainFilter,
      isActivePeripheral,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      loadInner: computed(() => store.load_spinner),
      gearInner: computed(() => store.gear_spinner),
      activeHome: computed(() => store.is_active_home),
      sensorBme280Temperature: computed(() => store.is_active_bme280_temperature),
      sensorBme280Pressure: computed(() => store.is_active_bme280_pressure),
      sensorBme280Humidity: computed(() => store.is_active_bme280_humidity),
      sensorMics6814NO2: computed(() => store.is_active_mics6814_no2),
      sensorMics6814NH3: computed(() => store.is_active_mics6814_nh3),
      sensorRadSensStatic: computed(() => store.is_active_radsens_static),
      sensorRadSensDynamic: computed(() => store.is_active_radsens_dynamic),
      sensorZe08ch2o: computed(() => store.is_active_ze08ch2o),
      sensorDs18b20: computed(() => store.is_active_ds18b20),
      esp32Settings: computed(() => store.is_active_esp32_settings),
      esp32Alarm: computed(() => store.is_active_esp32_alarm),
      esp32Journal: computed(() => store.is_active_esp32_journal),
      proxyServers: computed(() => store.is_active_proxy_servers),
      proxyZones: computed(() => store.is_active_proxy_zones),
      proxyAutoVPN: computed(() => store.is_active_proxy_autovpn),
      proxyManualVPN: computed(() => store.is_active_proxy_manualvpn),
      proxyIgnoreVPN: computed(() => store.is_active_proxy_ignorevpn),
      scheduleTimetable: computed(() => store.is_active_schedule_timetable),
      scheduleTasks: computed(() => store.is_active_schedule_tasks),
      scheduleCron: computed(() => store.is_active_schedule_cron),
      secureSshKeys: computed(() => store.is_active_secure_sshkeys),
      secureSshHosts: computed(() => store.is_active_secure_sshhosts),
      secureGitKeys: computed(() => store.is_active_secure_gitkeys),
      secureGitHosts: computed(() => store.is_active_secure_githosts),
      databaseTables: computed(() => store.is_active_database_tables),
      databaseSync: computed(() => store.is_active_database_sync),
      serverXU4: computed(() => store.is_active_server_xu4),
      serverN2: computed(() => store.is_active_server_n2),
      peripheral,
      bme280,
      mics6814,
      radsens,
      ze08ch2o,
      ds18b20,
      esp32,
      services,
      proxy,
      schedule,
      secure,
      database,
      servers,
      getSensorRef(base, sensor) {
        var href = "#/"+base+"?filter="+store.get_filter
        if (sensor != null){
          href = "#/"+base+"/"+sensor+"?filter="+store.get_filter
        }
        //console.log(href)
        return href
      },
      getRef(base, service) {
        var href = "#/"+base
        if (service != null){
          href = "#/"+base+"/"+service
        }
        //console.log(href)
        return href
      },
      setMenu(menu, submenu) {
        store.set_selected_menu(menu)
        store.set_selected_submenu(submenu)
        if(menu != 'home'){
          store.set_filter(mainFilter)
        }
      },
      logout () {
        auth.signOut()
        $router.push('/')
      },
    }
  },
  mounted () {
  },
  methods: {
  },
})
</script>

<style lang="sass" scoped>
.menu-item
  color: white
  background: #183b41
.sub-menu-item
  padding-left: 70px

</style>
