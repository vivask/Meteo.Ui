<template>
  <slot />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UiTableWrapper',

  expose: ['get', 'insert', 'update', 'delete', 'ignore', 'restore', 'selected'],

  props: {
    api: {
      type: String,
      required: true,
    },
  },

  methods: {
    async get() {
      return await this.axios
        .get(this.api)
        .then((response) => {
          return response.data.data;
        })
        .catch(() => {
          return [];
        });
    },

    async update(array, target) {
      return await this.axios
        .post(this.api, target)
        .then(() => {
          let idx = array.findIndex((item) => item.id === target.id);
          array[idx] = target;
          return array;
        })
        .catch(() => {
          return array;
        });
    },

    async insert(array, target) {
      return await this.axios
        .put(this.api, target)
        .then((resp) => {
          target.id = resp.data.data;
          array.push(target);
          return array;
        })
        .catch(() => {
          return array;
        });
    },

    async delete(array, target) {
      const url = this.api + '/' + target.id;
      return this.axios
        .delete(url, target)
        .then(() => {
          return this._filter(array, target);
        })
        .catch(() => {
          return array;
        });
    },

    async ignore(array, target) {
      return this.axios
        .put(this.api, target)
        .then(() => {
          return this._filter(array, target);
        })
        .catch(() => {
          return array;
        });
    },

    async restore(array, target) {
      return await this.ignore(array, target);
    },

    _filter(array, target) {
      if (target?.length > 0) {
        return array.filter((item) => !target.includes(item));
      } else {
        return array.filter((item) => item.id !== target.id);
      }
    },

    selected(row, selected) {
      let data = selected;
      if (data.length == 0) {
        data.push(row);
      }
      return data;
    },
  },
});
</script>
