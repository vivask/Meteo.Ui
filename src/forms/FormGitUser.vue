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
          <ui-input-vue ref="user" v-model="localProp.username" type="text" hint="User name *" autocomplete="off" />
          <ui-input-vue ref="pass" v-model="localProp.password" type="password" hint="Password *" autocomplete="off" />
          <ui-input-vue v-model="confirm" type="password" hint="Confirm password *" />
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
import { defineComponent, ref, onMounted, inject, nextTick, watch } from 'vue';
import UiInputVue from '@/components/UiInput.vue';
import { useSubmitForm } from '@/composables/useSubmitForm';

export default defineComponent({
  name: 'FormGitUser',

  components: {
    UiInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const axios = inject('axios');
    const popup = ref(null);
    const ssh_keys = ref([]);
    const confirm = ref(null);

    const user = ref(null);
    const pass = ref(null);

    const { localProp, show: formShow, handleSubmit, handleCancel, isUpdate } = useSubmitForm(popup, emit);

    onMounted(() => {
      axios.get('/sshclient/sshkeys').then((response) => {
        ssh_keys.value = response.data.data;
      });
    });

    return {
      localProp,
      popup,
      ssh_keys,
      confirm,
      user,
      pass,
      isUpdate,

      async show(prop) {
        formShow(prop);
        //console.log(user.value);
        //user.value.removeAttribute('autocomplete');
      },

      handleSubmit,
      handleCancel,
    };
  },
});
</script>
