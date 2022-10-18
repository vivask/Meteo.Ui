import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    current_path: ref("/"),
    filter: ref("avg"),
    selected_menu: ref("home"),
    selected_submenu: ref(""),
    load_spinner: false,
    gear_spinner: false,
    bme280_is_available: true,
    mics6814_is_available: true,
    ajax_state: true,
  }),

  getters: {
    get_ajax_state: (state) => state.ajax_state,
    get_filter() {
      return this.filter;
    },
    is_active_home() {
      this.ajax_state = false;
      return this.selected_menu + this.selected_submenu == "Home";
    },
    is_active_bme280_temperature() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "bme280" + "temperature"
      );
    },
    is_active_bme280_pressure() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "bme280" + "pressure"
      );
    },
    is_active_bme280_humidity() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "bme280" + "humidity"
      );
    },
    is_active_mics6814_no2() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "mics6814" + "no2";
    },
    is_active_mics6814_nh3() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "mics6814" + "nh3";
    },
    is_active_radsens_static() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "radsens" + "static";
    },
    is_active_radsens_dynamic() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "radsens" + "static";
    },
    is_active_ze08ch2o() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "ze08ch2o" + "ch2o";
    },
    is_active_ds18b20() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "ds18b20" + "temperature"
      );
    },
    is_active_esp32_settings() {
      this.ajax_state = false;
      return this.selected_menu + this.selected_submenu == "esp32" + "settings";
    },
    is_active_esp32_alarm() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "esp32" + "alarm";
    },
    is_active_esp32_journal() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "esp32" + "journal";
    },
    is_active_proxy_servers() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "proxy" + "servers";
    },
    is_active_proxy_zones() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "proxy" + "zones";
    },
    is_active_proxy_autovpn() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "proxy" + "autovpn";
    },
    is_active_proxy_manualvpn() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "proxy" + "manualvpn"
      );
    },
    is_active_proxy_ignorevpn() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "proxy" + "ignorevpn"
      );
    },
    is_active_schedule_timetable() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "schedule" + "timetable"
      );
    },
    is_active_schedule_tasks() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "schedule" + "tasks";
    },
    is_active_schedule_cron() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "schedule" + "cron";
    },
    is_active_secure_sshkeys() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "secure" + "sshkeys";
    },
    is_active_secure_sshhosts() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "secure" + "sshhosts"
      );
    },
    is_active_secure_gitkeys() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "secure" + "gitkeys";
    },
    is_active_secure_githosts() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "secure" + "githosts"
      );
    },
    is_active_database_tables() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "database" + "tables"
      );
    },
    is_active_database_sync() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "database" + "sync";
    },
    is_active_server_xu4() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "servers" + "xu4";
    },
    is_active_server_n2() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "servers" + "n2";
    },
    is_active_radius_auth() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "radius" + "auth";
    },
    is_active_radius_account() {
      this.ajax_state = true;
      return this.selected_menu + this.selected_submenu == "radius" + "account";
    },
    is_active_radius_verified() {
      this.ajax_state = true;
      return (
        this.selected_menu + this.selected_submenu == "radius" + "verified"
      );
    },
  },

  actions: {
    set_selected_menu(new_value) {
      this.selected_menu = new_value;
    },
    set_selected_submenu(new_value) {
      this.selected_submenu = new_value;
    },
    load_spinner_show() {
      this.load_spinner = true;
    },
    load_spinner_hide() {
      this.load_spinner = false;
    },
    gear_spinner_show() {
      this.gear_spinner = true;
    },
    gear_spinner_hide() {
      this.gear_spinner = false;
    },
    set_filter(new_value) {
      this.filter = new_value;
      //this.load_data()
    },
    set_current_path(new_value) {
      this.current_path = new_value;
    },
  },
});
