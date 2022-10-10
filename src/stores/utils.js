import { defineStore } from "pinia";
import { date } from "quasar";

export const useUtils = defineStore("utils", {
  state: () => ({
    //counter: 0
  }),

  getters: {},

  actions: {
    formatTime(time) {
      return date.formatDate(time, "MMM DD, YYYY HH:mm:ss");
    },
    emptyTime(time) {
      return date.formatDate(time, "X") == -62135596800;
    },
    validateIP(ip) {
      if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          ip
        )
      ) {
        return true;
      }
      return false;
    },
    validateDN(dn) {
      if (
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(dn)
      ) {
        return true;
      }
      return false;
    },
    validateHost(host) {
      return this.validateIP(host) || this.validateDN(host);
    },
    moreThanOrEqualToday(val) {
      try {
        const today = date.formatDate(new Date(), "YYYY-DD-MM");
        const ret = date.formatDate(val, "X") >= date.formatDate(today, "X");
        return ret;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    moreThanNow(ts, ds) {
      try {
        if (!ts || ts.length === 0 || !ds || ds.length === 0) {
          return true;
        }
        const time = date.formatDate(ds + " " + ts, "YYYY-MM-DD HH:mm:ss");
        const ret =
          date.formatDate(time, "X") > date.formatDate(new Date(), "X");
        return ret;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    isNumber(val) {
      return /^\d+$/.test(val);
    },
  },
});
