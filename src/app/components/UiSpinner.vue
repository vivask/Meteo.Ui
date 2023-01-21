<template>
  <div class="shadow">
    <div class="modalwin">
      <q-inner-loading :showing="visible">
        <component :is="spinner" size="4em" color="primary" :thickness="10" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiSpinner",

  props: {
    visible: {
      type: Boolean,
      default: true,
    },

    spinner: {
      type: String,
      default: "q-spinner",
    },
  },
});
</script>

<style lang="sass" scoped>
.modalwin
  height: 150px
  width: 150px
  background: #719ECE
  top: 40% /* отступ сверху */
  right: 0
  left: 0
  margin: 0 auto
  z-index:2 /* поверх всех */
  position: fixed /* фиксированное позиционирование, окно стабильно при прокрутке */
  padding: 15px
  border: 3px outset #000
  border-radius: .28571429rem .28571429rem .28571429rem .28571429rem
.modalwin .modalwin-content
  margin-top: -15px
  margin-left: -15px
.shadow
  position: fixed
  width:100%
  height:100%
  z-index:1 /* поверх всех  кроме окна*/
  background: #000
  opacity: 0.5 /*прозрачность*/
  left:0
  top:0
</style>
