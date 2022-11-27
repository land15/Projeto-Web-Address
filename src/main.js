import './styles/global.css'

import Vue from 'vue'
import App from './App.vue'

import Vuesax from 'vuesax'
import VueMask from 'v-mask'

import 'vuesax/dist/vuesax.css'

Vue.use(VueMask);
Vue.use(Vuesax, {
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
