import { Dialog } from 'quasar';

export function useConfirmDialog() {
  const show = (message) => {
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Confirm',
        message: message,
        cancel: true,
      })
        .onOk(() => resolve(true))
        .onCancel(() => resolve(false))
        .onDismiss(() => resolve(false));
    });
  };

  return { show };
}
