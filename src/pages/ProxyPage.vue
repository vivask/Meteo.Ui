<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Серверы</q-item-label>
        </q-item>
        <q-list>
          <q-item>
            <q-item-section side>
              <q-icon name="dns"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Основной сервер</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="masterActive"
            label="Активен"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="masterAdBlock"
            label="Блокировка рекламы"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="masterCache"
            label="Кэш"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item dense class="bot-line">
            <q-checkbox
            v-model="masterUnlock"
            label="Деблокировка сайтов"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon name="dns"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Резервный сервер</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="slaveActive"
            label="Активен"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="slaveAdBlock"
            label="Блокировка рекламы"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="slaveCache"
            label="Кэш"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
          <q-item dense>
            <q-checkbox
            v-model="slaveUnlock"
            label="Деблокировка сайтов"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            class="ml-30"
            />
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({

  setup () {

    let timer

    const $q = useQuasar()

    const masterActive = ref(false)
    const masterAdBlock = ref(false)
    const masterCache = ref(false)
    const masterUnlock = ref(false)
    const slaveActive = ref(false)
    const slaveAdBlock = ref(false)
    const slaveCache = ref(false)
    const slaveUnlock = ref(false)

    onMounted(() => {
      timer = setInterval(() => {
        //index.value = (index.value + 1) % colors.length
        //color.value = colors[ index.value ]
      }, 3000)
    })

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      masterActive,
      masterAdBlock,
      masterCache,
      masterUnlock,
      slaveActive,
      slaveAdBlock,
      slaveCache,
      slaveUnlock,

      cols: computed(() => `col-${($q.screen.name=='sm') ? 4 : ($q.screen.name=='xs') ? 11 : 3}`)
    }
  },

  methods: {
  },
})
</script>

<style lang="sass" scoped>
.bot-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.crisper
  .square
    margin: 5px
    background: rgba(86, 61, 124, .15)
    border: 1px solid rgba(86, 61, 124, .2)
</style>
