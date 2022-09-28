<template>
  <img src="~assets/wave.png" class="wave" alt="login-wave" />
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
                Sign
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="onSubmit()">
            <q-input label="Username *" v-model="login.username"> </q-input>
            <q-input label="Email *" v-model="login.email"> </q-input>
            <q-input
              label="Password *"
              type="password"
              v-model="login.password"
            >
            </q-input>
            <q-input label="Repeat *" type="password" v-model="login.repeat">
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
                <router-link class="text-white" to="/login"
                  >Have an account? Log in!</router-link
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
import { onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const login = {
  username: "",
  email: "",
  password: "",
  repeat: "",
};

export default {
  setup() {
    const store = useAuthStore();
    const $q = useQuasar();
    const $router = useRouter();

    onMounted(() => {});

    onBeforeUnmount(() => {});

    return {
      login,
      onSubmit() {
        if (
          !this.login.username ||
          !this.login.password ||
          !this.login.email ||
          !this.login.repeat
        ) {
          $q.notify({
            type: "negative",
            message: "The data provided is invalid.",
          });
        } else if (this.login.password.length < 6) {
          $q.notify({
            type: "negative",
            message: "Password must be 6 or more characters.",
          });
        } else if (this.login.password != this.login.repeat) {
          $q.notify({
            type: "negative",
            message: "Passwords do not match.",
          });
        } else {
          try {
            store.doSign(login);
            $router.push("/login");
          } catch (err) {
            if (err.response.data.detail) {
              $q.notify({
                type: "negative",
                message: err.response.data.detail,
              });
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
