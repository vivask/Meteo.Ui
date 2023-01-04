<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localProp.id" hint="Identifier *" :disable="disable" />
          <ui-input-vue v-model="localProp.name" hint="Name *" />
          <ui-input-vue v-model="localProp.api" hint="Api *" />
          <q-input v-model="localProp.note" dense outlined hint="Description" />
          <q-btn dense class="wd-320" outline color="grey" :label="labelBtnParams" @click="showParams = !showParams" />
          <div v-if="showParams">
            <q-table hide-header hide-bottom :rows="localProp.params" :columns="columns" row-key="name">
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <ui-round-btn-vue color="primary" icon="add" tooltip="Create parameter" @click="handleAdd" />
                  <ui-round-btn-vue
                    color="positive"
                    icon="mode_edit"
                    tooltip="Edit parameter"
                    @click="handleEdit(props.row)"
                  />
                  <ui-round-btn-vue
                    color="negative"
                    icon="delete"
                    tooltip="Delete parameter"
                    @click="handleDelete(props.rowIndex)"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
          <div v-if="showBtnAddParam">
            <q-btn class="wd-320" dense label="Add" color="primary" @click="handleAdd()" />
          </div>

          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="handleCancel" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <form-task-param-vue ref="form" @submit="handleParamSubmit" />
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import UiInputVue from '@/shared/components/UiInput.vue';
import UiRoundBtnVue from '@/shared/components/UiRoundBtn.vue';
import { useSubmitForm } from '@/shared/composables/useSubmitForm';
import FormTaskParamVue from './FormTaskParam.vue';
import { useConfirmDialog } from '@/shared/composables/useConfirmDialog.js';

const columns = [
  {
    name: 'name',
    align: 'left',
    field: 'name',
    style: 'max-width: 40px; width: 40px;',
  },
  {
    name: 'note',
    align: 'left',
    field: 'note',
    style: 'font-style: italic; max-width: 70px; width: 70px;',
  },
  { name: 'actions' },
];

export default defineComponent({
  name: 'FormTask',

  components: {
    UiInputVue,
    UiRoundBtnVue,
    FormTaskParamVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const form = ref(null);
    const showParams = ref(false);
    const labelBtnParams = computed(() => (showParams.value ? '<<' : '>>'));
    const { localProp, show, handleSubmit, handleCancel, isUpdate } = useSubmitForm(popup, emit);
    const confirm = useConfirmDialog();

    return {
      localProp,
      popup,
      form,
      columns,
      confirm,
      labelBtnParams,
      showParams,
      disable: computed(() => isUpdate.value),
      showBtnAddParam: computed(() =>
        showParams.value ? (localProp.value?.params ? localProp.value.params.length === 0 : true) : false,
      ),

      show,
      handleSubmit,
      handleCancel,

      handleAdd() {
        form.value.show({});
      },

      handleEdit(row) {
        form.value.show(row);
      },

      async handleDelete(id) {
        const ok = await confirm.show('Are you sure to delete this item?');
        if (ok) {
          if (id !== -1) {
            localProp.value.params.splice(id, 1);
          }
        }
      },

      handleParamSubmit(event) {
        if (!event.update) {
          if (!localProp.value?.params) {
            localProp.value.params = [];
          }
          localProp.value.params.push(event.data);
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-320
  width: 320px
  max-width: 320px
</style>
