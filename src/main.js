// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/style.css'
import '../node_modules/bootstrap/dist/js/bootstrap';


// import Toastr
import Toastr from '@deveodk/vue-toastr'
import VModal from 'vue2-bootstrap-modal';

import Vue from 'vue'
import App from './App'
import router from './core/router'

Vue.config.productionTip = false;
Vue.config.debug = true;

// Register vue component
Vue.component('vue-toastr', Toastr);
Vue.component('bootstrap-modal', VModal);

Vue.use(Toastr, {
  defaultPosition: 'toast-top-center',
  defaultTimeout: 4000
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

//this.$toastr('warning', 'i am a toastr', 'warning')
//this.$toastr('success', 'i am a toastr', 'success')
//this.$toastr('error', 'i am a toastr', 'error')
//this.$toastr('info', 'i am a toastr', 'info')

//https://www.npmjs.com/package/vue-simple-spinner
//https://www.npmjs.com/package/vue-loading-spinner
