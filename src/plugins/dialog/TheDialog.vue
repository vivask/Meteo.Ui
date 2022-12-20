<template>
  <q-dialog
    ref="popup"
    transition-show="flip-down"
    transition-hide="flip-up"
    @keyup.enter="handleConfirm"
    @escape-key="handleCancel"
  >
    <q-card class="min-width">
      <q-card-section>
        <div class="text-h6">Confirm</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="handleCancel" />
        <q-btn ref="ok" flat label="Ok" color="primary" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TheDialog',

  expose: ['show'],

  setup() {
    const message = undefined;
    const resolvePromise = undefined;
    const rejectPromise = undefined;
    const popup = ref(null);

    return {
      message,
      resolvePromise,
      rejectPromise,
      popup,

      show(opts = {}) {
        message.value = opts.message;
        popup.value.show();
        return new Promise((resolve, reject) => {
          resolvePromise.value = resolve;
          rejectPromise.value = reject;
        });
      },

      handleCancel() {
        popup.value.hide();
        resolvePromise(false);
      },

      handleConfirm() {
        popup.value.hide();
        resolvePromise(true);
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.min-width
  min-width: 350px
</style>
