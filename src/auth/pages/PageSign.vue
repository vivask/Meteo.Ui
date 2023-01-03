<template>
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-4 flex justify-center content-center"></div>
    <div
      :class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card :style="Screen.name === 'xs' ? { width: '80%' } : { width: '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="@/shared/assets/icons/account-circle-1.svg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-sm text-weight-regular">Signup</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="handelSubmit">
            <ui-input-vue v-model="signup.username" label="Username *" />
            <ui-input-vue v-model="signup.email" label="Email *" />
            <ui-password-input-vue ref="passwordInput" v-model="signup.password" label="Password *" />
            <ui-password-input-vue ref="confirmInput" v-model="confirm" label="Confirm password *" />
            <div>
              <q-btn class="full-width" color="primary" label="Signup" type="submit" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/login">Have an account? Log in!</router-link>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Screen, Notify } from 'quasar';
import { useAuthStore } from '@/shared/stores/useAuthStore.js';
import UiInputVue from '@/shared/components/UiInput.vue';
import UiPasswordInputVue from '@/shared/components/UiPasswordInput.vue';

export default defineComponent({
  name: 'PageSign',

  components: {
    UiInputVue,
    UiPasswordInputVue,
  },

  setup() {
    const store = useAuthStore();
    const signup = ref({});
    const confirm = ref(null);
    const confirmInput = ref(null);
    const passwordInput = ref(null);

    return {
      signup,
      Screen,
      confirm,
      confirmInput,
      passwordInput,

      handelSubmit() {
        if (signup.value.password != signup.value.confirm) {
          Notify.create({
            timeout: import.meta.env.ERROR_TIMEOUT,
            type: 'negative',
            message: 'Passwords do not match!',
          });
          confirmInput.value.focus();
        } else if (signup.value.password.length < 6) {
          Notify.create({
            timeout: import.meta.env.ERROR_TIMEOUT,
            type: 'negative',
            message: 'Password must be 6 or more characters.',
          });
          passwordInput.value.focus();
        } else {
          store.signup(signup);
        }
      },
    };
  },
});
</script>
