<template>
  <q-dialog v-model="confirm" @keyup.enter="handleEnter" @escape-key="handelEscape">
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirm</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="handelEscape" />
        <q-btn ref="ok" flat label="Ok" color="primary" @click="handleEnter" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UiConfirm',

  props: {
    confirm: {
      type: Boolean,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    handelEscape() {
      console.log('handelEscape');
    },

    handleEnter() {
      console.log('handleEnter');
    },
  },

  mounted() {
    this.$refs['ok'].focus();
  },
});
</script>
