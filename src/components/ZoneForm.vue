<template>
  <q-dialog v-model="modelValue" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="min-width">
      <q-card-section>
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
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
import { defineComponent, ref } from 'vue';
import UiInputVue from '@/components/UiInput.vue';

export default defineComponent({
  name: 'ZoneForm',

  components: {
    UiInputVue,
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    zone: {
      type: Object,
      required: true,
    },
  },

  emits: ['cancel', 'submit', 'update:modelValue'],

  setup(props) {
    return {
      localZone: ref({ ...props.zone }),
    };
  },

  methods: {
    handleSubmit() {
      this.$emit('update:modelValue', false);
      this.$emit('submit', this.localZone);
    },

    handleCancel() {
      this.$emit('update:modelValue', false);
      this.$emit('cancel');
    },
  },
});
</script>

<style lang="sass" scoped>
.min-width
  min-width: 350px
</style>
