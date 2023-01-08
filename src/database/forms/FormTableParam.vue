<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card style="min-width: 300px">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <q-select
            v-model="localProp.stype"
            outlined
            dense
            :options="stypes"
            option-label="note"
            hint="Sync method *"
            lazy-rules
            :rules="[(val) => val || 'Please select something']"
          />
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
import { defineComponent, ref, onMounted } from 'vue';
import { useSubmitForm } from 'src/app/composables/useSubmitForm';
import { getSyncTypes } from '../api/tableParamApi';

export default defineComponent({
  name: 'FormTableParam',

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const stypes = ref([]);

    const { localProp, show, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    onMounted(async () => (stypes.value = await getSyncTypes()));

    return {
      localProp,
      popup,
      stypes,

      show,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>
