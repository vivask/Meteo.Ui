<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Hosts Redirected to VPN</q-item-label>
        </q-item>
        <q-table
        hide-header
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn class="q-ml-xs" dense round color="warning" size="md" icon="healing" @click="onIgnore(props.row)"></q-btn>
              <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="onDelete(props.row)"></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


const columns = [
  { name: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'createdat', align: 'left', field: 'createdat', sortable: true },
  { name: 'actions'},
]

const rows = [
  {
    name: 'time.windows.com',
    createdat: 'Sep 18, 2022 22:02:25',
  },
]

export default {
  setup () {

    const $q = useQuasar()

    const name = ref(null)
    const address = ref(null)

    return {
      create: ref(false),
      columns,
      rows,
      name,
      address,
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 5}`),
      onIgnore (row) {
        console.log(row)
      },
      onDelete (row) {
        console.log(row)
      },
    }
  },
  methods: {
  }

}
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
