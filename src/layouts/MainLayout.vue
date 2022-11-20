<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Meteo </q-toolbar-title>

        <q-btn stretch flat to="/login" v-if="!isAuthenticated">Login</q-btn>
        <q-btn stretch flat @click="logout" v-else>Logout</q-btn>

        <q-btn flat round dense icon="mdi-dots-vertical" v-if="showRangeFilter">
          <q-menu>
            <q-list>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="rangeFilter"
                    val="avg"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerRangeFilter"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Average</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="rangeFilter"
                    val="min"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerRangeFilter"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Minimum</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="rangeFilter"
                    val="max"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerRangeFilter"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Maximum</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="rangeFilter"
                    val="all"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerRangeFilter"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>All</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          flat
          round
          dense
          icon="mdi-dots-vertical"
          v-if="showAccountingFilter"
        >
          <q-menu>
            <q-list>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="accountingFilter"
                    val="all"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerAccountigFilter()"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>All</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="accountingFilter"
                    val="verified"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerAccountigFilter()"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Verified</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="accountingFilter"
                    val="not_verified"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerAccountigFilter()"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Not Verified</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-close-popup>
                <q-item-section avatar>
                  <q-radio
                    v-model="accountingFilter"
                    val="alarm"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    @click="triggerAccountigFilter()"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Alarm</q-item-label>
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
        <q-item-label header>Menu</q-item-label>

        <q-item
          active-class="menu-item"
          clickable
          v-close-popup
          href="#/"
          :active="activeHome"
          @click="setMenu('', '', '')"
        >
          <q-item-section side>
            <q-icon name="mdi-home" color="blue" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="ml-15">Home</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-expansion-item expand-separator v-model="peripheral">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="blue" name="sensors" />
          </q-item-section>
          <q-item-section> Peripheral </q-item-section>
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
            @click="setMenu('peripheral', 'bme280', 'temperature')"
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
            @click="setMenu('peripheral', 'bme280', 'pressure')"
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
            @click="setMenu('peripheral', 'bme280', 'humidity')"
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
              @click="setMenu('peripheral', 'mics6814', 'no2')"
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
              @click="setMenu('peripheral', 'mics6814', 'nh3')"
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
              @click="setMenu('peripheral', 'radsens', 'static')"
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
              @click="setMenu('peripheral', 'radsens', 'dynamic')"
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
              @click="setMenu('peripheral', 'radsens', 'ch2o')"
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
              @click="setMenu('peripheral', 'ds18b20', 'temperature')"
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

      <q-expansion-item v-model="esp32" v-if="isAuthenticated">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="blue" name="mdi-memory" />
          </q-item-section>
          <q-item-section> Controller </q-item-section>
        </template>
        <q-list>
          <q-item
            active-class="menu-item"
            class="sub-menu-item"
            clickable
            v-close-popup
            :active="esp32Settings"
            :href="getRef('esp32', 'settings')"
            @click="setMenu('esp32', 'settings', '')"
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
            @click="setMenu('esp32', 'alarm', '')"
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
            @click="setMenu('esp32', 'journal', '')"
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
          <q-item-section> Services </q-item-section>
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
              @click="setMenu('services', 'proxy', 'servers')"
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
              @click="setMenu('services', 'proxy', 'zones')"
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
              :active="proxyManualVPN"
              :href="getRef('proxy', 'manualvpn')"
              @click="setMenu('services', 'proxy', 'manualvpn')"
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
              :active="proxyAutoVPN"
              :href="getRef('proxy', 'autovpn')"
              @click="setMenu('services', 'proxy', 'autovpn')"
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
              :active="proxyIgnoreVPN"
              :href="getRef('proxy', 'ignorevpn')"
              @click="setMenu('services', 'proxy', 'ignorevpn')"
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
              @click="setMenu('services', 'schedule', 'timetable')"
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
              @click="setMenu('services', 'schedule', 'tasks')"
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
              @click="setMenu('services', 'schedule', 'cron')"
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
              @click="setMenu('services', 'secure', 'sshkeys')"
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
              @click="setMenu('services', 'secure', 'sshhosts')"
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
              :active="secureGitHosts"
              :href="getRef('secure', 'gitusers')"
              @click="setMenu('services', 'secure', 'gitusers')"
            >
              <q-item-section>
                <q-item-label>Git Users</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-account" />
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
              @click="setMenu('services', 'database', 'tables')"
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
              @click="setMenu('services', 'database', 'sync')"
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
              :active="serverMain"
              :href="getRef('servers', 'main')"
              @click="setMenu('services', 'servers', 'main')"
            >
              <q-item-section>
                <q-item-label>Main (Chatreey)</q-item-label>
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
              :active="serverBackup"
              :href="getRef('servers', 'backup')"
              @click="setMenu('services', 'servers', 'backup')"
            >
              <q-item-section>
                <q-item-label>Backup (N2)</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-server-network" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          label="Radius"
          v-model="radius"
          switch-toggle-side
          dense-toggle
        >
          <q-list>
            <q-item
              active-class="menu-item"
              class="sub-menu-item"
              clickable
              v-close-popup
              :active="radiusAuth"
              :href="getRef('radius', 'auth')"
              @click="setMenu('services', 'radius', 'auth')"
            >
              <q-item-section>
                <q-item-label>Authorisation</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-account-circle-outline" />
              </q-item-section>
            </q-item>
            <q-item
              active-class="menu-item"
              class="sub-menu-item"
              clickable
              v-close-popup
              :active="radiusAccount"
              :href="getRef('radius', 'account')"
              @click="setMenu('services', 'radius', 'account')"
            >
              <q-item-section>
                <q-item-label>Accounting</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-table-account" />
              </q-item-section>
            </q-item>
            <q-item
              active-class="menu-item"
              class="sub-menu-item"
              clickable
              v-close-popup
              :active="radiusVerified"
              :href="getRef('radius', 'verified')"
              @click="setMenu('services', 'radius', 'verified')"
            >
              <q-item-section>
                <q-item-label>Verified</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="verified_user" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-expansion-item>
    </q-drawer>
    <q-ajax-bar
      position="bottom"
      color="yellow"
      size="10px"
      :hijack-filter="ajaxFilterFn"
    />
    <q-footer elevated>
      <q-toolbar>
        <q-spinner-bars color="primary" size="2em" v-if="isActivePeripheral" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="loadInner" maximized>
    <UiSpinner />
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { useLayoutStore } from "src/stores/layout";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";
import UiSpinner from "src/components/UiSpinner.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    UiSpinner,
  },

  setup() {
    const store = useLayoutStore();
    const auth = useAuthStore();
    const $router = useRouter();

    const leftDrawerOpen = ref(false);
    const rangeFilter = ref("avg");
    const accountingFilter = ref("all");
    const isActivePeripheral = ref(false);
    const peripheral = ref(false);
    const esp32 = ref(false);
    const services = ref(false);
    const bme280 = ref(false);
    const mics6814 = ref(false);
    const radsens = ref(false);
    const ze08ch2o = ref(false);
    const ds18b20 = ref(false);
    const proxy = ref(false);
    const schedule = ref(false);
    const secure = ref(false);
    const database = ref(false);
    const servers = ref(false);
    const radius = ref(false);

    watch(
      () => store.get_menu_level_0,
      (newValue) => {
        if (newValue) {
          eval(newValue).value = true;
        }
      }
    );

    watch(
      () => store.get_menu_level_1,
      (newValue) => {
        if (newValue) {
          eval(newValue).value = true;
        }
      }
    );

    onMounted(() => {
      if (store.get_menu_level_0) {
        eval(store.get_menu_level_0).value = true;
      }
      if (store.get_menu_level_1) {
        eval(store.get_menu_level_1).value = true;
      }
    });

    return {
      isAuthenticated: computed(() => auth.is_authenticated),
      leftDrawerOpen,
      rangeFilter,
      accountingFilter,
      isActivePeripheral,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loadInner: computed(() => store.load_spinner),
      activeHome: computed(() => store.get_menu_level_0 === ""),
      sensorBme280Temperature: computed(
        () => store.get_menu_level_2 === "temperature"
      ),
      sensorBme280Pressure: computed(
        () => store.get_menu_level_2 === "pressure"
      ),
      sensorBme280Humidity: computed(
        () => store.get_menu_level_2 === "humidity"
      ),
      sensorMics6814NO2: computed(() => store.get_menu_level_2 === "no2"),
      sensorMics6814NH3: computed(() => store.get_menu_level_2 === "nh2"),
      sensorRadSensStatic: computed(() => store.get_menu_level_2 === "static"),
      sensorRadSensDynamic: computed(
        () => store.get_menu_level_2 === "dynamic"
      ),
      sensorZe08ch2o: computed(() => store.get_menu_level_2 === "ch2o"),
      sensorDs18b20: computed(() => store.get_menu_level_2 === "temperature"),
      esp32Settings: computed(() => store.get_menu_level_1 === "settings"),
      esp32Alarm: computed(() => store.get_menu_level_1 === "alarm"),
      esp32Journal: computed(() => store.get_menu_level_1 === "journal"),
      proxyServers: computed(() => store.get_menu_level_2 === "servers"),
      proxyZones: computed(() => store.get_menu_level_2 === "zones"),
      proxyAutoVPN: computed(() => store.get_menu_level_2 === "autovpn"),
      proxyManualVPN: computed(() => store.get_menu_level_2 === "manualvpn"),
      proxyIgnoreVPN: computed(() => store.get_menu_level_2 === "ignorevpn"),
      scheduleTimetable: computed(() => store.get_menu_level_2 === "timetable"),
      scheduleTasks: computed(() => store.get_menu_level_2 === "tasks"),
      scheduleCron: computed(() => store.get_menu_level_2 === "cron"),
      secureSshKeys: computed(() => store.get_menu_level_2 === "sshkeys"),
      secureSshHosts: computed(() => store.get_menu_level_2 === "sshhosts"),
      secureGitKeys: computed(() => store.get_menu_level_2 === "gitkeys"),
      secureGitHosts: computed(() => store.get_menu_level_2 === "githosts"),
      databaseTables: computed(() => store.get_menu_level_2 === "tables"),
      databaseSync: computed(() => store.get_menu_level_2 === "sync"),
      serverMain: computed(() => store.get_menu_level_2 === "main"),
      serverBackup: computed(() => store.get_menu_level_2 === "backup"),
      radiusAuth: computed(() => store.get_menu_level_2 === "auth"),
      radiusAccount: computed(() => store.get_menu_level_2 === "account"),
      radiusVerified: computed(() => store.get_menu_level_2 === "verified"),
      showRangeFilter: computed(() => store.show_range_filter),
      showAccountingFilter: computed(() => store.show_accounting_filter),
      peripheral,
      esp32,
      services,
      bme280,
      mics6814,
      radsens,
      ze08ch2o,
      ds18b20,
      proxy,
      schedule,
      secure,
      database,
      servers,
      radius,
      getSensorRef(base, sensor) {
        var href = "#/" + base + "?filter=" + store.get_filter;
        if (sensor != null) {
          href = "#/" + base + "/" + sensor + "?filter=" + store.get_filter;
        }
        //console.log(href)
        return href;
      },
      getRef(base, service) {
        var href = "#/" + base;
        if (service != null) {
          href = "#/" + base + "/" + service;
        }
        //console.log(href)
        return href;
      },
      setMenu(L_0, L_1, L_2) {
        store.set_menu(L_0, L_1, L_2);
        if (L_0 != "") {
          store.set_filter(rangeFilter);
        }
      },
      selectMenu() {
        this.peripheral = store.get_menu_level_0 === "peripheral";
        this.esp32 = store.get_menu_level_0 === "esp32";
        this.services = store.get_menu_level_0 === "services";
        this.bme280 = store.get_menu_level_1 === "bme280";
        this.mics6814 = store.get_menu_level_1 === "mics6814";
        this.radsens = store.get_menu_level_1 === "radsens";
        this.ze08ch2o = store.get_menu_level_1 === "ze08ch2o";
        this.ds18b20 = store.get_menu_level_1 === "ds18b20";
        this.proxy = store.get_menu_level_1 === "proxy";
        this.schedule = store.get_menu_level_1 === "schedule";
        this.secure = store.get_menu_level_1 === "secure";
        this.database = store.get_menu_level_1 === "database";
        this.servers = store.get_menu_level_1 === "servers";
        this.radius = store.get_menu_level_1 === "radius";
      },
      logout() {
        auth.signOut();
        $router.push("/");
      },
      ajaxFilterFn(url) {
        return !(
          url === "/api/v1/admin/esp32/status/get" ||
          url === "/api/v1/esp32/peripheral/get"
        );
      },
      triggerRangeFilter() {
        store.set_ranre_filter(rangeFilter.value);
      },
      async triggerAccountigFilter() {
        await store.set_accounting_filter(accountingFilter.value);
      },
    };
  },

  methods: {
    SetMenuState() {
      console.log("SetMenuState");
    },
  },
});
</script>

<style lang="sass" scoped>
.menu-item
  color: white
  background: #183b41
.sub-menu-item
  padding-left: 70px
</style>
