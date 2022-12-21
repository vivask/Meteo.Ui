<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="min-width">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <ui-input-vue v-model="localProp.name" hint="Name/IP Address *" rule="host" />
          <q-select
            v-model="localProp.list.id"
            outlined
            dense
            :options="localList"
            hint="Acess list *"
            lazy-rules
            :rules="[() => localProp.list || 'Please select something']"
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
import { defineComponent, computed, ref, watch, toRefs } from 'vue';
import UiInputVue from '@/components/UiInput.vue';
import { useSubmitForm } from '@/composables/useSubmitForm';

export default defineComponent({
  name: 'VpnHostForm',

  components: {
    UiInputVue,
  },

  props: {
    list: {
      type: Array,
      require: true,
    },
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const localList = computed(() => props.list.map(({ id }) => id));
    const popup = ref(null);

    const { localProp, show, handleSubmit, handleCancel } = useSubmitForm(popup, emit);

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
