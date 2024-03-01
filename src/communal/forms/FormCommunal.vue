<template>
  <q-dialog ref="popup" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card class="min-width">
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <q-input
            v-model="localProp.created_at"
            outlined
            dense
            type="date"
            hint="Дата"
            reactive-rules
            :disable="dateLock"
            lazy-rules
            :rules="[(val) => validDate(val) || 'Incorrect date']"
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="localProp.created_at" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="localProp.elec_measured" hint="Расход электроэнергия *" dense outlined type="number" />
          <q-input v-model="localProp.elec_paid" hint="Оплачено электроэнергия *" dense outlined type="number" />
          <q-input v-model="localProp.elec_verification" hint="Поверка электроэнергия *" dense outlined type="number" />
          <q-input v-model="localProp.gas_measured" hint="Расход газ *" dense outlined type="number" />
          <q-input v-model="localProp.gas_paid" hint="Оплачено газ *" dense outlined type="number" />
          <q-input v-model="localProp.gas_verification" hint="Поверка газ *" dense outlined type="number" />
          <q-input v-model="localProp.water_measured" hint="Расход вода *" dense outlined type="number" />
          <q-input v-model="localProp.water_paid" hint="Оплачено вода *" dense outlined type="number" />
          <q-input v-model="localProp.water_verification" hint="Поверка вода *" dense outlined type="number" />
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
import { defineComponent, ref } from 'vue';
import UiInputVue from '../../app/components/UiInput.vue';
import { useSubmitForm } from '../../app/composables/useSubmitForm';
import { useUtils } from '../../app/composables/useUtils';

export default defineComponent({
  name: 'FormCommunal',

  components: {
    UiInputVue,
  },

  emits: ['cancel', 'submit'],

  setup(props, { emit }) {
    const popup = ref(null);
    const dateLock = ref(true);
    const emptyForm = {
      created_at: new Date().toISOString().slice(0, 10),
      elec_measured: '',
      elec_paid: '',
      elec_verification: '0',
      gas_measured: '',
      gas_paid: '',
      gas_verification: '0',
      water_measured: '',
      water_paid: '',
      water_verification: '0',
    };

    const { localProp, show: formShow, handleSubmit: formSubmit, handleCancel } = useSubmitForm(popup, emit);
    const { isDate } = useUtils();

    return {
      localProp,
      popup,
      dateLock,

      show(prop) {
        if (Object.keys(prop).length === 0) {
          dateLock.value = false;
          prop = emptyForm;
        } else {
          prop.created_at = prop.created_at.slice(0, 10);
        }
        formShow(prop);
      },

      handleSubmit() {
        localProp.value.created_at = new Date(localProp.value.created_at).toISOString();
        localProp.value.elec_measured = parseInt(localProp.value.elec_measured, 10);
        localProp.value.elec_paid = parseInt(localProp.value.elec_paid, 10);
        localProp.value.elec_verification = parseInt(localProp.value.elec_verification, 10);
        localProp.value.gas_measured = parseInt(localProp.value.gas_measured, 10);
        localProp.value.gas_paid = parseInt(localProp.value.gas_paid, 10);
        localProp.value.gas_verification = parseInt(localProp.value.gas_verification, 10);
        localProp.value.water_measured = parseInt(localProp.value.water_measured, 10);
        localProp.value.water_paid = parseInt(localProp.value.water_paid, 10);
        localProp.value.water_verification = parseInt(localProp.value.water_verification, 10);
        formSubmit();
      },

      handleCancel,

      validDate: (v) => (!v || !v.length ? true : isDate(v)),
    };
  },
});
</script>

<style lang="sass" scoped>
.min-width
  min-width: 350px
</style>
