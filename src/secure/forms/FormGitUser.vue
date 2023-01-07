<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" autocomplete="off" @submit.prevent="handleSubmit">
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
          <ui-input-vue v-model="localProp.username" type="text" hint="User name *" />
          <ui-password-input-vue v-model="localProp.password" hint="Password *" />
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
import { defineComponent, ref, onMounted } from 'vue';
import UiInputVue from '@/shared/components/UiInput.vue';
import UiPasswordInputVue from '@/shared/components/UiPasswordInput.vue';
import { useSubmitForm } from '@/shared/composables/useSubmitForm';
import { Notify } from 'quasar';
import { getSshKeys } from '../api/formsApi';

export default defineComponent({
  name: 'FormGitUser',

  components: {
    UiInputVue,
    UiPasswordInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const ssh_keys = ref([]);
    const confirm = ref(null);
    const input = ref(null);

    const { localProp, show: formShow, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    onMounted(async () => (ssh_keys.value = await getSshKeys()));

    return {
      localProp,
      popup,
      ssh_keys,
      confirm,
      input,

      show(prop) {
        confirm.value = prop.password;
        formShow(prop);
      },

      handleSubmit,
      handleCancel,

      onSubmit() {
        if (localProp.value.password != confirm.value) {
          Notify.create({
            timeout: import.meta.env.ERROR_TIMEOUT,
            type: 'negative',
            message: 'Passwords do not match!',
          });
          input.value.focus();
        } else {
          handleSubmit();
        }
      },
    };
  },
});
</script>
