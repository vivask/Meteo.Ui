<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Local hosts</q-item-label>
            <q-space />
            <q-btn
            v-if="isShowHeaderButton"
            class="wd-100"
            dense
            color="primary"
            size="md"
            label="Add"
            @click="create = true"
            />
        </q-item>
        <q-table
        hide-header
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[10, 50, 100, 0]"
        >
          <template v-slot:body-cell-state="props">
            <q-td :props="props">
              <q-icon
              :name="activeIcon(props.row)"
              size="1.2rem"
              :color="activeColor(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round color="primary" size="md" icon="add" @click="create = true" />
              <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="onEdit(props.row)" />
              <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="onDelete(props.row)" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <q-dialog v-model="create" transition-show="rotate" transition-hide="rotate">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form
          @submit="onSubmit(create)"
          class="q-gutter-md"
        >
          <q-input
            v-model="name"
            outlined
            hint="Host Name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="address"
            outlined
            hint="IP Address *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="mac"
            outlined
            hint="MAC Address"
          />
          <q-input
            v-model="note"
            outlined
            hint="Note"
          />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


const columns = [
  { name: 'state'},
  { name: 'address', align: 'left', field: 'address', sortable: true },
  { name: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'mac', align: 'left', field: 'mac', sortable: true },
  { name: 'actions'},
]

const rows = [
  {
    active: false,
    address: '192.168.1.1',
    name: 'time.windows.com',
    mac: 'b8:69:f4:18:ca:5b',
  },
]

export default {
  setup () {

    const $q = useQuasar()

    const name = ref(null)
    const address = ref(null)
    const mac = ref(null)
    const note = ref(null)
    const isShowHeaderButton = ref(false)

    return {
      create: ref(false),
      columns,
      rows,
      name,
      address,
      mac,
      note,
      isShowHeaderButton: computed(() => (rows.length===0)),
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 5}`),
      onEdit (row) {
        console.log(row)
      },
      onDelete (row) {
        console.log(row)
      },
      activeIcon (row) {
        return (row.active) ? "task_alt" : "highlight_off"
      },
      activeColor (row) {
        return (row.active) ? "positive" : "grey"
      },
      onSubmit (dlg) {
        this.create = false
      }

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
