import { createApp, inject } from 'vue';
import TheDialog from './TheDialog.vue';

export const DIALOG_KEY = Symbol('DIALOG_KEY');

export function useDialog() {
  return inject(DIALOG_KEY);
}

/*export function DialogPlugin({ container } = {}) {
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  const dialogInstance = createApp(TheDialog).mount(container);

  const dialog = {
    show(message) {
      dialogInstance.show(message);
    },

    install(app) {
      app.provide(DIALOG_KEY, dialog);
    },
  };

  return dialog;
}*/

export const DialogPlugin = {
  install: (app, { container } = {}) => {
    let containerToMount = container;
    if (!containerToMount) {
      containerToMount = document.createElement('div');
      document.body.appendChild(containerToMount);
    }

    const dialog = createApp(TheDialog).mount(containerToMount);

    app.provide(DIALOG_KEY, dialog);
    // Для простой миграции с Vue 2
    app.config.globalProperties.$dialog = dialog;
    // Вдруг пригодится монтировать свой тостер
    app.component('TheDialog', TheDialog);

    return dialog;
  },
};
