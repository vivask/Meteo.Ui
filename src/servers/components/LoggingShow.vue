<template>
  <q-dialog ref="popup" :maximized="true">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div></div>
        <q-space />
        <q-btn icon="mdi-autorenew" flat round dense @click="refresh">
          <q-tooltip>Refresh</q-tooltip>
        </q-btn>
        <q-btn icon="mdi-eraser" flat round dense @click="handleClear">
          <q-tooltip>Clear</q-tooltip>
        </q-btn>
        <q-btn icon="close" flat round dense @click="handleClose">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 90vh" class="scroll">
        <p v-for="(line, idx) in lines" :key="idx" ref="items">{{ line }}</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue';

export default defineComponent({
  name: 'LoggingShow',

  emits: ['close'],

  setup(props, { emit }) {
    const popup = ref(null);
    const lines = ref(null);
    const fnClear = ref(null);
    const fnRefresh = ref(null);
    const items = ref(null);

    const refresh = async () => {
      if (fnRefresh?.value) {
        lines.value = await fnRefresh.value();
        await nextTick();
        if (items?.value) {
          const lastLine = items.value[lines.value.length - 1];
          lastLine.scrollIntoView();
        }
      }
    };

    const handleClose = () => {
      popup.value.hide();
      emit('close');
    };

    const show = async (get, clear) => {
      fnRefresh.value = get;
      fnClear.value = clear;
      refresh();
      popup.value.show();
    };

    return {
      popup,
      items,
      lines,
      handleClose,
      show,
      refresh,

      handleClear() {
        if (fnClear?.value) {
          lines.value = [];
          fnClear.value();
        }
      },
    };
  },
});
</script>
