<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">List of cron jobs</q-item-label>
            <q-space />
            <q-btn
            class="wd-100"
            dense
            color="primary"
            size="md"
            label="Update"
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
              name="schedule"
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
        </q-table>
      </div>
    </div>
  </div>

</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


const columns = [
  { name: 'state' },
  { name: 'job' },
]

const rows = [
  {
    name: 'ByFly PPP check time',
    note: 'Next run at: 2022-09-20 12:31:16',
  },
  {
    name: 'Check storage is mounted',
    note: 'Next run at: 2022-09-20 12:21:30',
  }
]

export default {
  setup () {

    const $q = useQuasar()

    const name = ref(null)

    return {
      create: ref(false),
      columns,
      rows,
      name,
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
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
