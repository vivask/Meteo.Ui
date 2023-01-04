<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 300px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <q-select
            v-model="localProp.name"
            outlined
            dense
            :options="params"
            option-label="name"
            option-value="name"
            hint="Parameter name *"
            emit-value
            map-options
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please select something']"
          />
          <ui-input-vue v-model="localProp.value" hint="Parameter value *" />
          <q-card-actions align="left" class="text-primary">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="handleCancel" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import UiInputVue from '@/shared/components/UiInput.vue';
import { useSubmitForm } from '@/shared/composables/useSubmitForm';

export default defineComponent({
  name: 'FormTaskParam',

  components: {
    UiInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const params = ref([]);

    const { localProp, show: formShow, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    return {
      localProp,
      popup,
      params,

      show(prop) {
        const { row: row, params: list } = { ...prop };
        params.value = list;
        formShow(row);
      },

      handleSubmit,
      handleCancel,
    };
  },
});
</script>
