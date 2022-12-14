// FILE: main.js

import { createApp } from 'vue';
import { Quasar } from 'quasar';
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

//app.config.globalProperties.$state = new loaderState();

app.use(Quasar, { plugins: {} });
app.use(VueAxios, axios);
app.use(router);
app.use(createPinia());
app.mount('#app');
