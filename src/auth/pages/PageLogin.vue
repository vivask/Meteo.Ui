<template>
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-4 flex justify-center content-center"></div>
    <div class="col-12 col-md-6 flex content-center">
      <q-card :style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img :src="icon" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-sm text-weight-regular">Login</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="onSubmit">
            <ui-input-vue v-model="login.username" label="Username" />
            <ui-password-input-vue v-model="login.password" label="Password" />
            <div>
              <q-btn class="full-width" color="primary" label="Login" type="submit" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/forgot">Forgot password?</router-link>
                <router-link class="text-white" to="/sign">Create an account</router-link>
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
import { useAuthStore } from '../../app/stores/useAuthStore.js';
import { Notify } from 'quasar';
import UiPasswordInputVue from '../../app/components/UiPasswordInput.vue';
import UiInputVue from '../../app/components/UiInput.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageLogin',

  components: {
    UiPasswordInputVue,
    UiInputVue,
  },

  setup() {
    const login = ref({});
    const router = useRouter();
    const icon = new URL('../../app/assets/icons/account-circle-1.svg', import.meta.url).href;

    return {
      login,
      icon,

      async onSubmit() {
        const authStore = useAuthStore();
        try {
          await authStore.login(login.value.username, login.value.password);
          const to = router.currentRoute.value.query.next || '/';
          router.push(to);
        } catch (error) {
          Notify.create({
            timeout: process.env.NOTIFY_TIMEOUT,
            type: 'negative',
            message: error,
          });
        }
      },
    };
  },
});
</script>
