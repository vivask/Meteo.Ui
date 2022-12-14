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
              <h2 class="text-h2 text-uppercase q-my-sm text-weight-regular">Signup</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="onSubmit()">
            <q-input label="Username *" v-model="signup.username"> </q-input>
            <q-input label="Email *" v-model="signup.email"> </q-input>
            <q-input label="Password *" type="password" v-model="signup.password"> </q-input>
            <q-input label="Confirm password *" type="password" v-model="signup.confirm"> </q-input>
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
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';

const signup = {
  username: null,
  email: null,
  password: null,
  confirm: null,
};

export default defineComponent({
  name: 'PageSign',

  setup() {
    const $q = useQuasar();

    return {
      signup: ref(signup),
      confirm,
    };
  },
});
</script>

<style lang="sass" scoped>
.wave
  position: fixed
  height: 100%
  left: 0
  bottom: 0
  z-index: -1
</style>
