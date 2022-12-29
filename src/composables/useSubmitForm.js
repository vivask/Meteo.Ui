import { ref } from 'vue';

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export function useSubmitForm(popup, emit) {
  const localProp = ref(null);
  const isUpdate = ref(false);

  const show = (prop) => {
    isUpdate.value = !!prop?.id;
    localProp.value = deepClone(prop);
    popup.value.show();
  };

  const handleSubmit = () => {
    popup.value.hide();
    emit('submit', { data: deepClone(localProp.value), update: isUpdate.value });
  };

  const handleCancel = () => {
    popup.value.hide();
    emit('cancel');
  };

  return { localProp, show, handleSubmit, handleCancel, isUpdate };
}
