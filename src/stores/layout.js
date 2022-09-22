import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLayoutStore = defineStore('layout', {
  state: () => ({
    current_path: ref('/'),
    filter: ref('avg'),
    selected_menu: ref('home'),
    selected_submenu: ref(''),
    load_spinner: false,
    gear_spinner: false,
    bme280_is_available: true,
    mics6814_is_available: true,
  }),

  getters: {
    get_filter () {
      return this.filter
    },
    is_active_home () {
      return (this.selected_menu+this.selected_submenu) == ('Home')
    },
    is_active_bme280_temperature () {
      return (this.selected_menu+this.selected_submenu) == ('bme280'+'temperature')
    },
    is_active_bme280_pressure () {
      return (this.selected_menu+this.selected_submenu) == ('bme280'+'pressure')
    },
    is_active_bme280_humidity () {
      return (this.selected_menu+this.selected_submenu) == ('bme280'+'humidity')
    },
    is_active_mics6814_no2 () {
      return (this.selected_menu+this.selected_submenu) == ('mics6814'+'no2')
    },
    is_active_mics6814_nh3 () {
      return (this.selected_menu+this.selected_submenu) == ('mics6814'+'nh3')
    },
    is_active_radsens_static () {
      return (this.selected_menu+this.selected_submenu) == ('radsens'+'static')
    },
    is_active_radsens_dynamic () {
      return (this.selected_menu+this.selected_submenu) == ('radsens'+'static')
    },
    is_active_ze08ch2o () {
      return (this.selected_menu+this.selected_submenu) == ('ze08ch2o'+'ch2o')
    },
    is_active_ds18b20 () {
      return (this.selected_menu+this.selected_submenu) == ('ds18b20'+'temperature')
    },
    is_active_esp32_settings () {
      return (this.selected_menu+this.selected_submenu) == ('esp32'+'settings')
    },
    is_active_esp32_alarm () {
      return (this.selected_menu+this.selected_submenu) == ('esp32'+'alarm')
    },
    is_active_esp32_journal () {
      return (this.selected_menu+this.selected_submenu) == ('esp32'+'journal')
    },
    is_active_proxy_servers () {
      return (this.selected_menu+this.selected_submenu) == ('proxy'+'servers')
    },
    is_active_proxy_zones () {
      return (this.selected_menu+this.selected_submenu) == ('proxy'+'zones')
    },
    is_active_proxy_autovpn () {
      return (this.selected_menu+this.selected_submenu) == ('proxy'+'autovpn')
    },
    is_active_proxy_manualvpn () {
      return (this.selected_menu+this.selected_submenu) == ('proxy'+'manualvpn')
    },
    is_active_proxy_ignorevpn () {
      return (this.selected_menu+this.selected_submenu) == ('proxy'+'ignorevpn')
    },
    is_active_schedule_timetable () {
      return (this.selected_menu+this.selected_submenu) == ('schedule'+'timetable')
    },
    is_active_schedule_tasks () {
      return (this.selected_menu+this.selected_submenu) == ('schedule'+'tasks')
    },
    is_active_schedule_cron () {
      return (this.selected_menu+this.selected_submenu) == ('schedule'+'cron')
    },
    is_active_secure_sshkeys () {
      return (this.selected_menu+this.selected_submenu) == ('secure'+'sshkeys')
    },
    is_active_secure_sshhosts () {
      return (this.selected_menu+this.selected_submenu) == ('secure'+'sshhosts')
    },
    is_active_secure_gitkeys () {
      return (this.selected_menu+this.selected_submenu) == ('secure'+'gitkeys')
    },
    is_active_secure_githosts () {
      return (this.selected_menu+this.selected_submenu) == ('secure'+'githosts')
    },
    is_active_database_tables () {
      return (this.selected_menu+this.selected_submenu) == ('database'+'tables')
    },
    is_active_database_sync () {
      return (this.selected_menu+this.selected_submenu) == ('database'+'sync')
    },
    is_active_server_xu4 () {
      return (this.selected_menu+this.selected_submenu) == ('servers'+'xu4')
    },
    is_active_server_n2 () {
      return (this.selected_menu+this.selected_submenu) == ('servers'+'n2')
    },
  },

  actions: {
    set_selected_menu(new_value){
      this.selected_menu = new_value
    },
    set_selected_submenu(new_value){
      this.selected_submenu = new_value
    },
    load_spinner_show () {
      this.load_spinner = true
    },
    load_spinner_hide () {
      this.load_spinner = false
    },
    gear_spinner_show () {
      this.gear_spinner = true
    },
    gear_spinner_hide () {
      this.gear_spinner = false
    },
    set_filter (new_value) {
      this.filter = new_value
      //this.load_data()
    },
    set_current_path (new_value) {
      this.current_path = new_value
    }
  }
})
