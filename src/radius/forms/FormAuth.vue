<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" autocomplete="off" @submit.prevent="onSubmit">
          <ui-input-vue v-model="localProp.username" hint="User Name *" autocomplete="off" />
          <ui-password-input-vue v-model="localProp.value" hint="Password *" autocomplete="off" />
          <ui-password-input-vue ref="input" v-model="confirm" hint="Confirm password *" />
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
import UiPasswordInputVue from '@/components/UiPasswordInput.vue';
import { useSubmitForm } from '@/composables/useSubmitForm';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'FormAuth',

  components: {
    UiInputVue,
    UiPasswordInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const confirm = ref(null);
    const input = ref(null);
    const isPwd = ref(true);

    const { localProp, show: formShow, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    return {
      localProp,
      popup,
      confirm,
      input,
      isPwd,

      show(prop) {
        confirm.value = prop.value;
        formShow(prop);
      },

      handleSubmit,
      handleCancel,

      onSubmit() {
        if (localProp.value.value != confirm.value) {
          Notify.create({
            timeout: import.meta.env.ERROR_TIMEOUT,
            type: 'negative',
            message: 'Passwords do not match!',
          });
          input.value.focus();
        } else {
          localProp.value.attribute = 'Cleartext-Password';
          localProp.value.op = ':=';
          handleSubmit();
        }
      },
    };
  },
});
</script>
