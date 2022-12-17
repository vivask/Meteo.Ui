<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="min-width">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localHost.name" hint="Name/IP Address *" rule="host" />
          <q-select
            v-model="localHost.list.id"
            outlined
            dense
            :options="list"
            option-label="id"
            hint="Acess list *"
            lazy-rules
            :rules="[() => localHost.list || 'Please select something']"
          />
          <q-input v-model="localHost.note" dense outlined hint="Note" />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="handleCancel" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="js">
import { defineComponent, computed } from 'vue';
import UiInputVue from '@/components/UiInput.vue';

export default defineComponent({
  name: 'VpnHostForm',

  components: {
    UiInputVue,
  },

  props: {
    host: {
      type: Object,
      require: true,
    },

    list: {
      type: Array,
      require: true,
    },
  },

  emits: ['cancel', 'submit'],

  setup(props) {
    const localHost = computed(() => {
      return { ...props.host };
    });

    return {
      localHost,
    };
  },

  methods: {
    show() {
      this.$refs.popup.show();
    },

    handleSubmit() {
      this.$refs.popup.hide();
      this.$emit('submit', this.localHost);
    },

    handleCancel() {
      this.$refs.popup.hide();
      this.$emit('cancel');
    },
  },
});
</script>

<style lang="sass" scoped>
.min-width
  min-width: 350px
</style>
