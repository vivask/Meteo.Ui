import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

const confirm = useConfirmDialog();

export function useTableHandlers(form, rows, wrapper, empty) {
  const handleAdd = () => {
    form.value.show(empty);
  };

  const handleEdit = (row) => {
    form.value.show(row);
  };

  const handleSubmit = async (event) => {
    if (event.update) {
      rows.value = await wrapper.Update(rows.value, event.data);
    } else {
      rows.value = await wrapper.Insert(rows.value, event.data);
    }
  };

  const handleDelete = async (row) => {
    const ok = await confirm.show('Are you sure to delete this item?');
    if (ok) {
      rows.value = await wrapper.Delete(rows.value, row);
    }
  };

  return { handleAdd, handleEdit, handleSubmit, handleDelete };
}
