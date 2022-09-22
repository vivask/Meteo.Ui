<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Tasks Management</q-item-label>
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
              name="task"
              size="2rem"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-job="props">
            <q-td :props="props">
              <q-card square flat>
                <q-card-section align="left">
                  <div class="text-subtitle1 text-bold job-name">{{props.row.name}}</div>
                  <div class="text-subtitle2">{{props.row.note}}</div>
                </q-card-section>
              </q-card>
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
            v-model="id"
            hint="Identifier *"
            outlined
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="name"
            hint="Name *"
            outlined
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="description"
            outlined
            hint="Description"
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
  { name: 'state' },
  { name: 'job' },
  { name: 'actions' },
]

const rows = [
  {
    name: 'Telegram messanger',
    note: 'Бот отправки сообщений в телеграм',
  },
  {
    name: 'Synchronyze ESP32 tables',
    note: 'Синхронизация таблиц контроллера',
  }
]

export default {
  setup () {

    const $q = useQuasar()

    const id = ref(null)
    const name = ref(null)
    const description = ref(null)

    return {
      create: ref(false),
      columns,
      rows,
      id,
      name,
      description,
      isShowHeaderButton: computed(() => (rows.length===0)),
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 6}`),
      onEdit (row) {
        console.log(row)
      },
      onDelete (row) {
        console.log(row)
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
  .job-name
    color: #1976D2
</style>
