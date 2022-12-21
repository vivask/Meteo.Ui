// FILE: main.js

import { createApp } from 'vue';
import { Quasar, Dialog, Notify } from 'quasar';
import { router } from './router';
import { createPinia } from 'pinia';
import VueAxios from 'vue-axios';
import axios from '@/helpers/axios.js';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from '@/App.vue';

let app = createApp(App);
let store = createPinia();

//app.config.globalProperties.$prefix = import.meta.env.VITE_ROUTER_MODE === 'hash' ? '#' : '';

app.use(Quasar, { plugins: { Dialog, Notify } });
app.use(VueAxios, axios);
app.provide('axios', axios);
app.use(router);
store.use(() => ({ axios }));
app.use(store);
app.mount('#app');
