import { nextTick } from 'vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

const confirm = useConfirmDialog();

export function useTableHandlers(visible, form, rows, wrapper, empty) {
  const handleAdd = async () => {
    visible.value = true;
    await nextTick();
    form.value.show(empty);
  };

  const handleEdit = async (row) => {
    visible.value = true;
    await nextTick();
    form.value.show(row);
  };

  const handleDelete = async (row) => {
    const ok = await confirm.show('Are you sure to delete this item?');
    if (ok) {
      rows.value = await wrapper.Delete(row);
    }
  };

  const handleSubmit = async (event) => {
    if (event.update) {
      rows.value = await wrapper.Update(event.data);
    } else {
      rows.value = await wrapper.Insert(event.data);
    }
    visible.value = false;
  };

  const handleCancel = () => {
    visible.value = false;
  };

  return { handleAdd, handleEdit, handleDelete, handleSubmit, handleCancel };
}
