<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Table Synchronization</q-item-label>
        </q-item>
        <q-table
        hide-header
        :rows="rows"
        :columns="columns"
        row-key="table"
        :rows-per-page-options="[10, 50, 100, 0]"
        >

          <template v-slot:top>
            <q-checkbox
            v-model="isSelected"
            color="grey"
            @update:model-value="onSelectedAll"
            />
            <q-space />
            <q-btn
            class="q-ml-xs"
            dense
            color="warning"
            size="md"
            icon="sync"
            :disabled="isDisabled"
            @click="onAllSync()"
            />
          </template>

          <template v-slot:body-cell-selected="props">
            <q-td :props="props" class="wd-40">
              <q-checkbox
              v-model="props.row.model"
              color="grey"
              :val="props.row.selected"
              @update:model-value="onSelected"
            />

            </q-td>
          </template>
          <template v-slot:body-cell-direction="props">
            <q-td :props="props">
              <q-btn
              class="q-ml-xs"
              dense
              color="warning"
              size="md"
              :val="props.rowIndex"
              :label="props.row.direction"
              @click="onDirection(props.rowIndex)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn class="q-ml-xs" dense color="warning" size="md" icon="sync" @click="onSync(props.row)" />
            </q-td>
          </template>
        </q-table>
        <div class="q-mt-md">
          Selected: {{ JSON.stringify(selected) }}
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


const columns = [
  { name: 'selected'},
  { name: 'model'},
  { name: 'table', align: 'left', field: 'table', sortable: true },
  { name: 'method' },
  { name: 'direction' },
  { name: 'action'},
]

const rows = [
  {
    selected: false,
    model: ref([]),
    table: 'bmx280',
    method: 'replace',
    direction: 'M=>S',
  },
  {
    selected: false,
    model: ref([]),
    table: 'ds18b20',
    method: 'replace',
    direction: 'S=>M',
  },
]

export default {
  setup () {

    const $q = useQuasar()

    const selected = ref([])
    const isSelected = ref(false)


    return {
      columns,
      rows,
      selected,
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 5}`),
      isSelected,
      isDisabled: computed(() => (selected.value.length===0)),
      getSelectedString () {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      },
      onSync (row) {
        console.log('onSync not implemented')
      },
      onDirection (idx) {
        rows[idx].direction = ( rows[idx].direction === 'M=>S' ) ? 'S=>M' : 'M=>S'
      },
      onAllSync () {
        console.log('onAllSync not implemented')
      },
      onSelected () {
        isSelected.value = (selected.value.length===rows.length) ? true : (selected.value.length===0) ? false : null
      },
      onSelectedAll () {
        console.log(isSelected.value)
        if(isSelected.value===true){
          console.log('unselect all')
          //isSelected.value=false
          //selected.value = []
        }else{
          console.log('select all')
        }
      }
    }
  },
  computed: {
    directionLabel: function(idx) {
      return 'M=>S'
    }
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
