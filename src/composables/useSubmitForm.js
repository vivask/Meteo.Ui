import { ref } from 'vue';

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export function useSubmitForm(popup, emit) {
  const localProp = ref(null);

  const show = (prop) => {
    localProp.value = deepClone(prop);
    popup.value.show();
  };

  const handleSubmit = () => {
    popup.value.hide();
    const isUpdate = !!localProp.value?.id;
    emit('submit', { data: deepClone(localProp.value), update: isUpdate });
  };

  const handleCancel = () => {
    popup.value.hide();
    emit('cancel');
  };

  return { localProp, show, handleSubmit, handleCancel };
}
