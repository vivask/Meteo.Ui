<template>
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-4 flex justify-center content-center"></div>
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/account-circle-1.svg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">
                Login
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="onSubmit()">
            <q-input label="Username" v-model="login.username"> </q-input>
            <q-input label="Password" type="password" v-model="login.password">
            </q-input>
            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Login"
                type="submit"
                rounded
              ></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/forgot"
                  >Forgot password?</router-link
                >
                <router-link class="text-white" to="/sign"
                  >Create an account</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const login = {
  username: null,
  password: null,
};

export default {
  setup() {
    const store = useAuthStore();
    const $q = useQuasar();
    const $router = useRouter();

    onMounted(() => {});

    onBeforeUnmount(() => {});

    return {
      login: ref(login),
      async onSubmit() {
        if (!this.login.username || !this.login.password) {
          $q.notify({
            type: "negative",
            message: "The data provided is invalid.",
          });
        } else if (this.login.password.length < 1) {
          $q.notify({
            type: "negative",
            message: "Password must be 6 or more characters.",
          });
        } else {
          try {
            await store.doLogin(login);
            const to = $router.currentRoute.value.query.next || "/";
            $router.push(to);
          } catch (err) {
            if (err.response.data.detail) {
              $q.notify({
                type: "negative",
                message: err.response.data.detail,
              });
            } else {
              if (err.response.status === 401) {
                $q.notify({
                  type: "negative",
                  message: "Unknown user name or password",
                });
              } else {
                $q.notify({
                  type: "negative",
                  message: "Authentication error",
                });
              }
            }
          }
        }
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.wave
  position: fixed
  height: 100%
  left: 0
  bottom: 0
  z-index: -1
</style>
