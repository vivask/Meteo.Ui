<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <q-input
            v-model="localProp.name"
            dense
            hint="Name *"
            outlined
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
          <q-input v-model="localProp.note" dense outlined hint="Note" />
          <q-btn dense class="wd-320" outline color="grey" :label="labelBtnParams" @click="showParams = !showParams" />
          <div v-if="showParams">
            <q-table hide-header hide-bottom :rows="localProp.params" :columns="columns" row-key="name">
              <template #body-cell-value="props">
                <q-td :props="props">
                  <div class="text-subtitle2 text-left text-primary">
                    {{ props.row.stype.note }}
                  </div>
                </q-td>
              </template>
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <ui-round-btn-vue color="primary" icon="add" @click="handleAdd()" />
                  <ui-round-btn-vue color="positive" icon="mode_edit" @click="handleEdit(props.row)" />
                  <ui-round-btn-vue color="negative" icon="delete" @click="handleEdit(props.row)" />
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

  <form-table-param-vue ref="form" @submit="handleParamSubmit" />
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import UiInputVue from '@/shared/components/UiInput.vue';
import { useSubmitForm } from '@/shared/composables/useSubmitForm';
import FormTableParamVue from './FormTableParam.vue';
import { useConfirmDialog } from '@/shared/composables/useConfirmDialog.js';
import UiRoundBtnVue from '@/shared/components/UiRoundBtn.vue';

const columns = [{ name: 'value', align: 'left', classes: 'wd-50' }, { name: 'actions' }];

export default defineComponent({
  name: 'FormTable',

  components: {
    UiInputVue,
    FormTableParamVue,
    UiRoundBtnVue,
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
.wd-50
  width: 50px
  max-width: 50px
.wd-320
  width: 320px
  max-width: 320px
</style>
