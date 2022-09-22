<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Tables management</q-item-label>
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
              name="mdi-table"
              size="2rem"
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
          <q-btn
          dense=""
          class="wd-310"
          outline
          color="grey"
          :label="labelBtnParams"
          @click="onParams()"
          />
          <div v-if="showParams">
            <q-table
            hide-header
            hide-bottom
            :rows="params"
            :columns="scheme"
            row-key="name"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense round color="primary" size="md" icon="add" @click="createParam = true" />
                  <q-btn class="q-ml-xs" dense round color="positive" size="md" icon="mode_edit" @click="onEditParam(props.row)" />
                  <q-btn class="q-ml-xs" dense round color="negative" size="md" icon="delete" @click="onDeleteParam(props.row)" />
                </q-td>
              </template>
            </q-table>
          </div>
          <div v-if="showBtnAddParam">
            <q-btn
            class="wd-310"
            dense
            label="Add"
            color="primary"
            @click="createParam = true"
            />
          </div>
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary " />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="createParam" transition-show="rotate" transition-hide="rotate">
    <q-card style="min-width: 300px">
      <q-card-section>
        <q-form
          @submit="onSubmitParam(createParam)"
          class="q-gutter-md"
        >
          <q-select
          outlined
          v-model="method"
          :options="methods"
          hint="Sync method *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
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
  { name: 'state', align: 'left' },
  { name: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'description', align: 'left', field: 'description', sortable: true },
  { name: 'actions' },
]

const rows = [
  {
    name: 'bmx280',
  },
  {
    name: 'ds18b20',
  }
]

const scheme = [
  { name: 'value', align: 'left', field: 'value', sortable: true  },
  { name: 'actions' },
]

const params = [
  {
    value: 'Replace'
  }
]


export default {
  setup () {

    const $q = useQuasar()

    const name = ref(null)
    const description = ref(null)
    const labelBtnParams = ref('>>')
    const paramValue = ref(null)
    const method = ref(null)

    return {
      create: ref(false),
      columns,
      rows,
      name,
      description,
      isShowHeaderButton: computed(() => (rows.length===0)),
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
      labelBtnParams,
      paramValue,
      scheme,
      params,
      showParams: computed(() => (labelBtnParams.value==='<<' && params.length!=0)),
      showBtnAddParam: computed(() => (labelBtnParams.value==='<<' && params.length==0)),
      createParam: ref(false),
      method,
      methods: ['Replace', 'Sycronization'],
      onEdit (row) {
        console.log(row)
      },
      onDelete (row) {
        console.log(row)
      },
      onSubmit (dlg) {
        this.create = false
      },
      onParams () {
        if(labelBtnParams.value == '>>'){
          labelBtnParams.value = '<<'
        }else{
          labelBtnParams.value = '>>'
        }
      },
      onSubmitParam (dlg) {
        this.createParam = false
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
  .job-name
    color: #1976D2
</style>
