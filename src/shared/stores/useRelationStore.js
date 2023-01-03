import { defineStore } from 'pinia';
import { ref } from 'vue';

const relations = {
  '/proxy/autovpn': [{ '/proxy/ignorevpn': true }],
  '/proxy/ignorevpn': [{ '/proxy/autovpn': true }],
  '/schedule/tasks': [{ '/schedule/jobs': true }],
  '/schedule/jobs': [{ '/schedule/cron': true }],
  '/sshclient/sshkeys': [{ '/sshclient/sshhosts': true }, { '/sshclient/gitusers': true }],
};

export const useRelationStore = defineStore('relation', () => {
  const items = ref(relations);

  return {
    items,

    modify(from) {
      for (let item of items.value[from]) {
        Object.keys(item).forEach((key) => {
          item[key] = true;
        });
      }
    },

    refresh(to) {
      Object.values(items.value).forEach((dest) => {
        for (let item of dest) {
          Object.keys(item).forEach((key) => {
            if (to === key) {
              item[key] = false;
            }
          });
        }
      });
    },

    modified(to) {
      let result = true;
      Object.values(items.value).forEach((values) => {
        for (let item of values) {
          Object.keys(item).forEach((key) => {
            if (to === key) {
              result = item[key];
            }
          });
        }
      });
      return result;
    },
  };
});
