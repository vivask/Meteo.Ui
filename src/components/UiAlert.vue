<template>
  <div class="alert"></div>
  <div class="q-pa-md modalwin">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders">
        <q-item>
          <q-item-label class="text-bold text-h6 text-negative" style="padding-top: 5px">
            <slot>{{ text }}</slot>
          </q-item-label>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UiAlert',

  props: {
    text: {
      type: String,
      default: 'No data...',
    },
  },
});
</script>

<style lang="sass" scoped>
.alert
  position: fixed
  width:100%
  height:100%
  z-index:1 /* поверх всех  кроме окна*/
  background: #000
  opacity: 0.5 /*прозрачность*/
  left:0
  top:0
.crisper
  top: 40% /* отступ сверху */
  right: 0
  left: 0
  margin: 0 auto
  position: fixed /* фиксированное позиционирование, окно стабильно при прокрутке */
  .square
    background: rgba(86, 61, 124, .15)
    border: 1px solid rgba(86, 61, 124, .2)
</style>
