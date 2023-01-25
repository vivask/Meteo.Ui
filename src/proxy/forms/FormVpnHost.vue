<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="min-width">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localProp.name" hint="Name/IP Address *" />
          <q-select
            v-model="localProp.list"
            outlined
            dense
            :options="localList"
            option-label="id"
            hint="Acess list *"
            lazy-rules
            :rules="[(val) => val || 'Please select something']"
          />
          <q-input v-model="localProp.note" dense outlined hint="Note" />
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
import { defineComponent, ref, onMounted, onRenderTracked } from 'vue';
import UiInputVue from '../../app/components/UiInput.vue';
import { useSubmitForm } from '../../app/composables/useSubmitForm';
import { getVpnLists } from '../api/formManualVpnApi';

export default defineComponent({
  name: 'FormVpnHost',

  components: {
    UiInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const localList = ref([]);
    const popup = ref(null);

    const { localProp, show, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

    onMounted(async () => {
      localList.value = await getVpnLists();
    });

    return {
      localProp,
      localList,
      popup,

      show,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style lang="sass" scoped>
.min-width
  min-width: 350px
</style>
