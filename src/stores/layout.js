import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    current_path: ref("/"),
    filter: ref("avg"),
    selected_menu_level_0: ref("home"),
    selected_menu_level_1: ref(""),
    selected_menu_level_2: ref(""),
    load_spinner: false,
    gear_spinner: false,
    bme280_is_available: true,
    mics6814_is_available: true,
    range_filter: ref("avg"),
    range_filter_set: [
      "/bme280/temperature",
      "/bme280/pressure",
      "/bme280/humidity",
    ],
    accounting_filter: ref("all"),
    accounting_filter_set: ["/radius/account"],
    accounting_rows: ref([]),
  }),

  getters: {
    get_current_path: (state) => state.current_path,
    get_ajax_state: (state) => state.ajax_skip,
    get_filter: (state) => state.filter,
    get_menu_level_0: (state) => state.selected_menu_level_0,
    get_menu_level_1: (state) => state.selected_menu_level_1,
    get_menu_level_2: (state) => state.selected_menu_level_2,
    show_range_filter: (state) =>
      state.range_filter_set.includes(state.current_path),
    show_accounting_filter: (state) =>
      state.accounting_filter_set.includes(state.current_path),
    get_range_filter: (state) => state.range_filter,
    get_accounting_filter: (state) => state.accounting_filter,
    get_accounting_rows: (state) => state.accounting_rows,
  },

  actions: {
    set_menu(L_0, L_1, L_2) {
      this.selected_menu_level_0 = L_0;
      this.selected_menu_level_1 = L_1;
      this.selected_menu_level_2 = L_2;
    },
    set_selected(new_value) {
      const words = new_value.split("/");
      switch (words.length) {
        case 2:
          this.selected_menu_level_0 = "";
          this.selected_menu_level_1 = "";
          this.selected_menu_level_2 = "";
          break;
        case 3:
          switch (words[1]) {
            case "esp32":
              this.selected_menu_level_0 = words[1];
              this.selected_menu_level_1 = words[2];
              this.selected_menu_level_2 = "";
              break;
            case "bme280":
            case "mics6814":
            case "radsens":
            case "ze08ch2o":
            case "ds18b20":
              this.selected_menu_level_0 = "peripheral";
              this.selected_menu_level_1 = words[1];
              this.selected_menu_level_2 = words[2];
              break;
            case "proxy":
            case "schedule":
            case "secure":
            case "database":
            case "servers":
            case "radius":
              this.selected_menu_level_0 = "services";
              this.selected_menu_level_1 = words[1];
              this.selected_menu_level_2 = words[2];
              break;
            default:
              console.log("Invalid input: [" + new_value + "]");
          }
          break;
        default:
          console.log("Invalid input: [" + new_value + "]");
      }
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
      //console.log("current path:", new_value);
      this.current_path = new_value;
      this.set_selected(new_value);
      console.log("L0", this.selected_menu_level_0);
      console.log("L1", this.selected_menu_level_1);
      console.log("L2", this.selected_menu_level_2);
    },
    set_ranre_filter(new_value) {
      this.range_filter = new_value;
    },
    async set_accounting_filter(new_value) {
      this.accounting_filter = new_value;
      let url;
      switch (new_value) {
        case "verified":
          url = "/api/v1/admin/radius/account/verified/get";
          break;
        case "not_verified":
          url = "/api/v1/admin/radius/account/notverified/get";
          break;
        case "alarm":
          url = "/api/v1/admin/radius/account/alarm/get";
          break;
        default:
          url = "/api/v1/admin/radius/account/get";
          break;
      }
      await axios
        .get(url)
        .then((response) => {
          this.accounting_rows = response.data.data;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
});
