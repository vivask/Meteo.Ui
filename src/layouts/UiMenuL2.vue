<template>
  <q-item
    active-class="menu-item"
    clickable
    v-close-popup
    :href="href"
    :active="active"
    :class="{ 'sub-menu-item': l2 }"
  >
    <q-item-section side>
      <q-icon :name="icon" :color="color" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="ml-15">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiMenuL2",

  props: {
    icon: {
      type: String,
      required: true,
    },

    href: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    l2: {
      type: Boolean,
      default: true,
    },

    color: {
      type: String,
      default: "primary",
    },
  },
});
</script>

<style lang="sass" scoped>
.menu-item
  color: white
  background: #183b41
.sub-menu-item
  padding-left: 70px
</style>
