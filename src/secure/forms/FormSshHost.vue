<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localProp.host" hint="Host Name/IP *" rule="ip" />
          <q-select
            v-model="localProp.ssh_key"
            outlined
            dense
            :options="ssh_keys"
            option-label="owner"
            hint="Service *"
            lazy-rules
            :rules="[(val) => val || 'Please select something']"
          />
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
import { defineComponent, ref, onMounted } from 'vue';
import UiInputVue from '../../app/components/UiInput.vue';
import { useSubmitForm } from '../../app/composables/useSubmitForm';
import { getSshKeys } from '../api/formsApi';

export default defineComponent({
  name: 'FormSshKey',

  components: {
    UiInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const ssh_keys = ref([]);

    const { localProp, show, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    onMounted(async () => (ssh_keys.value = await getSshKeys()));

    return {
      localProp,
      popup,
      ssh_keys,

      show,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>
