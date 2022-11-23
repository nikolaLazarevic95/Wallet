import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import store from './store/index';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import DropdownDialog from './components/ui/DropdownDialog'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'


const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toast, {
  // Setting the global default position
  position: POSITION.BOTTOM_RIGHT,
});
app.use(VueChartkick)

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('dropdown-dialog', DropdownDialog)

app.mount('#app');
