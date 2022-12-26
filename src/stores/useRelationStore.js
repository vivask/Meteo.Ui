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
      for (let to of items.value[from]) {
        console.log('from: ', items.value[from]);
        Object.entries(to).forEach(({ key, val }) => {
          console.log('to: ', key);
          val = true;
        });
      }
    },

    refresh(to) {
      Object.keys(items.value).forEach((key) => {
        Object.entries(key).forEach(({ key, val }) => {
          if (to === key) {
            val = false;
          }
        });
      });
    },

    modified(to) {
      Object.keys(items.value).forEach((from) => {
        Object.entries(from).forEach(({ key, val }) => {
          if (to === key) {
            return val;
          }
        });
      });
      return true;
    },
  };
});
