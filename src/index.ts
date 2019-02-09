import Vue from 'vue'
import AppPage from '@/index.vue'
import {store} from '@/store'

new Vue({
  store,
  render: h => h(AppPage),
}).$mount('#app')
