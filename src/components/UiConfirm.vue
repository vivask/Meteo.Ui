<template>
  <q-dialog
    ref="popup"
    transition-show="flip-down"
    transition-hide="flip-up"
    @keyup.enter="_confirm"
    @escape-key="_cancel"
  >
    <q-card class="min-width">
      <q-card-section>
        <div class="text-h6">Confirm</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="_cancel" />
        <q-btn ref="ok" flat label="Ok" color="primary" @click="_confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UiConfirm',

  expose: ['show'],

  setup() {
    return {
      message: undefined,
      resolvePromise: undefined,
      rejectPromise: undefined,
    };
  },

  methods: {
    show(opts = {}) {
      this.message = opts.message;
      this.$refs.popup.show();
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _cancel() {
      this.$refs.popup.hide();
      this.resolvePromise(false);
    },

    _confirm() {
      this.$refs.popup.hide();
      this.resolvePromise(true);
    },
  },
});
</script>

<style lang="sass" scoped>
.min-width
  min-width: 350px
</style>
