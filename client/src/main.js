import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iechk from 'is-iexplorer'
import vuetify from './plugins/vuetify'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
Vue.use(iechk)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
