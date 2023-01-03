// FILE: main.js

import { createApp } from 'vue';
import { Quasar, Dialog, Notify } from 'quasar';
import { router } from './app/router';
import { createPinia } from 'pinia';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from '@/app/App.vue';

const app = createApp(App);
const store = createPinia();

//app.config.globalProperties.$prefix = import.meta.env.VITE_ROUTER_MODE === 'hash' ? '#' : '';

app.use(Quasar, { plugins: { Dialog, Notify } });
app.use(router);
//store.use(() => ({ axios }));
app.use(store);
app.mount('#app');
