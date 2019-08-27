import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/mavoneditor.js'
import './plugins/axios.js'

Vue.config.productionTip = false
// Vue.prototype.$axios = axios;

Vue.component('tree-item', { template: '#item-template' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
