<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localProp.owner" hint="Key Name *" />
          <ui-input-vue v-model="localProp.finger" hint="Content *" type="textarea" />
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
import { useSubmitForm } from '@/composables/useSubmitForm';

export default defineComponent({
  name: 'FormSshKey',

  components: {
    UiInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);

    const { localProp, show, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    return {
      localProp,
      popup,

      show,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>
