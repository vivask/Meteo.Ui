<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="min-width">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localZone.name" hint="Host Name *" />
          <ui-input-vue v-model="localZone.address" hint="IP Address *" rule="ip" />
          <q-input v-model="localZone.mac" dense outlined hint="MAC Address" />
          <q-input v-model="localZone.note" dense outlined hint="Note" />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="handleCancel" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue';
import UiInputVue from '@/components/UiInput.vue';

export default defineComponent({
  name: 'ZoneForm',

  components: {
    UiInputVue,
  },

  props: {
    zone: {
      type: Object,
      required: true,
    },
  },

  emits: ['cancel', 'submit'],

  setup(props) {
    const localZone = computed(() => ({ ...props.zone }));
    const isUpdate = computed(() => !!props.zone?.id);
    return {
      localZone,
      isUpdate,
    };
  },

  methods: {
    show() {
      this.$refs.popup.show();
    },

    handleSubmit() {
      this.$refs.popup.hide();
      this.$emit('submit', { data: this.localZone, update: this.isUpdate });
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
