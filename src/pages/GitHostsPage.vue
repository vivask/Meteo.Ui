<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Git hosts management</q-item-label>
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
            <q-td :props="props" class="wd-20">
              <q-icon
              :name="activeIcon(props.row)"
              size="1.2rem"
              :color="activeColor(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-icon="props">
            <q-td :props="props" class="wd-80">
              <q-icon
              name="computer"
              size="md"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-key="props">
            <q-td :props="props" class="wd-100">
                  <div class="text-subtitle1 text-bold key-name">{{props.row.name}}</div>
                  <div class="text-subtitle2">User: {{props.row.user}}</div>
                  <div class="text-subtitle2">{{props.row.createdat}}</div>
                  <div class="text-subtitle2">{{props.row.used}}</div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round color="primary" size="md" icon="add" @click="create = true"></q-btn>
              <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="onEdit(props.row)"></q-btn>
              <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="onDelete(props.row)"></q-btn>
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
            hint="Name/IP Address *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="vpnlist"
            outlined
            hint="Acess list *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
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
  { name: 'icon'},
  { name: 'key'},
  { name: 'name' },
  { name: 'user' },
  { name: 'createdat', },
  { name: 'actions'},
]

const rows = [
  {
    active: true,
    name: 'Mikrotiks',
    user: 'vivask',
    createdat: 'Created: Aug 12, 2022 10:51:36',
    used: 'Last used: Sep 20, 2022 02:00:07'
  },
]

export default {
  setup () {

    const $q = useQuasar()

    const name = ref(null)
    const vpnlist = ref(null)
    const note = ref(null)

    return {
      create: ref(false),
      columns,
      rows,
      name,
      vpnlist,
      note,
      isShowHeaderButton: computed(() => (rows.length===0)),
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
      onEdit (row) {
        console.log(row)
      },
      onDelete (row) {
        console.log(row)
      },
      onSubmit (dlg) {
        this.create = false
      },
      activeIcon (row) {
        return (row.active) ? "task_alt" : "highlight_off"
      },
      activeColor (row) {
        return (row.active) ? "positive" : "grey"
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
  .key-name
    color: #1976D2

</style>
