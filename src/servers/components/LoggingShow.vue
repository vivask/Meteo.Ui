<template>
  <q-dialog ref="popup" :maximized="true">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div></div>
        <q-space />
        <q-btn icon="close" flat round dense @click="handleClose" />
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 85vh" class="scroll">
        <p v-for="(line, idx) in lines" :key="idx">{{ line }}</p>
      </q-card-section>

      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Clear" color="primary" @click="handleClear" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoggingShow',

  emits: ['close'],

  setup(props, { emit }) {
    const popup = ref(null);
    const lines = ref(null);

    const handleClose = () => {
      popup.value.hide();
      emit('close');
    };

    const show = (prop) => {
      lines.value = prop;
      popup.value.show();
    };

    return {
      popup,
      lines,
      handleClose,
      show,

      handleClear() {},
    };
  },
});
</script>
