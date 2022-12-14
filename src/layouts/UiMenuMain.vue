<template>
  <q-drawer v-model="model" show-if-above bordered :width="width" :class="color">
    <UiMenuL2Vue
      :href="menuHome.href"
      :icon="menuHome.icon"
      :active="menuHome.active"
      :title="menuHome.title"
      :l2="false"
      @click="setMenu('', '', '')"
    />
    <UiMenuL0Vue v-model="menuPeripheral.model" :icon="menuPeripheral.icon" :title="menuPeripheral.title">
      <UiMenuL1Vue v-for="L1 in menuPeripheral.menu" :key="L1.value" v-model="L1.model" :label="L1.label">
        <UiMenuL2Vue
          v-for="L2 in L1.menu"
          :key="L2.value"
          :href="getHref(L1.value, L2.value)"
          :icon="L2.icon"
          :active="L2.active"
          :title="L2.title"
          @click="setMenu(menuPeripheral.value, L1.value, L2.value)"
        />
      </UiMenuL1Vue>
    </UiMenuL0Vue>
    <UiMenuL0Vue v-if="show" v-model="menuController.model" :icon="menuController.icon" :title="menuController.title">
      <UiMenuL2Vue
        v-for="L2 in menuController.menu"
        :key="L2.value"
        :href="getHref(menuController.value, L2.value)"
        :icon="L2.icon"
        :active="L2.active"
        :title="L2.title"
        @click="setMenu(menuController.value, L2.value, '')"
      />
    </UiMenuL0Vue>
    <UiMenuL0Vue v-if="show" v-model="menuServices.model" :icon="menuServices.icon" :title="menuServices.title">
      <UiMenuL1Vue v-for="L1 in menuServices.menu" :key="L1.value" v-model="L1.model" :label="L1.label">
        <UiMenuL2Vue
          v-for="L2 in L1.menu"
          :key="L2.value"
          :href="getHref(L1.value, L2.value)"
          :icon="L2.icon"
          :active="L2.active"
          :title="L2.title"
          @click="setMenu(menuServices.value, L1.value, L2.value)"
        />
      </UiMenuL1Vue>
    </UiMenuL0Vue>
  </q-drawer>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useMenuHome, useMenuPeripheral, useMenuController, useMenuServices } from '@/layouts/menuMain.js';
import UiMenuL0Vue from '@/layouts/UiMenuL0.vue';
import UiMenuL1Vue from '@/layouts/UiMenuL1.vue';
import UiMenuL2Vue from '@/layouts/UiMenuL2.vue';
import { useAuthStore } from '@/stores/useAuthStore.js';

export default defineComponent({
  name: 'UiMenuMain',

  components: {
    UiMenuL0Vue,
    UiMenuL1Vue,
    UiMenuL2Vue,
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    width: {
      type: Number,
      default: 250,
    },

    color: {
      type: String,
      default: 'bg-grey-3',
    },
  },

  setup(props) {
    const authStore = useAuthStore();

    return {
      model: computed(() => props.modelValue),
      menuHome: useMenuHome,
      menuPeripheral: useMenuPeripheral,
      menuController: useMenuController,
      menuServices: useMenuServices,

      show: computed(() => authStore.loggedIn),

      setMenu(L0, L1, L2) {
        console.log('L0: ', L0);
        console.log('L1: ', L1);
        console.log('L2: ', L2);
      },

      getHref(p0, p1) {
        return '#/' + p0 + '/' + p1;
      },
    };
  },
});
</script>
