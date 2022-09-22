<template>
  <div class="shadow">
    <div class="modalwin">
      <q-inner-loading
      :showing="visible"
      >
        <q-spinner-pie size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const visible = ref(true)

    return {
      visible,
    }
  }
}
</script>

<style lang="sass" scoped>
.modalwin
  height: 100px
  width: 100px
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
  background:#000
  opacity: 0.5 /*прозрачность*/
  left:0
  top:0
.inner
  margin-left: auto
  margin-right: auto
</style>
