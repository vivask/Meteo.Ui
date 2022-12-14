<template>
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-4 flex justify-center content-center"></div>
    <div
      :class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card :style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="../assets/icons/account-circle-1.svg" alt="avatar" />
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
            <q-input label="Username" v-model="login.username"> </q-input>
            <q-input label="Password" type="password" v-model="login.password"> </q-input>
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
import { useAuthStore } from '@/stores/useAuthStore.js';

const login = {
  username: null,
  password: null,
};

export default defineComponent({
  name: 'PageLogin',

  setup() {
    return {
      login: ref(login),
      onSubmit() {
        const authStore = useAuthStore();
        return authStore.login(login.username, login.password).catch((error) => console.log(error));
      },
    };
  },
});
</script>

<style lang="sass" scoped></style>
