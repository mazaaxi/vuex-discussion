import Vue from 'vue'
import AppPage from '@/index.vue'
import {store} from '@/store'
import '@/logic'

new Vue({
  store,
  render: h => h(AppPage),
}).$mount('#app')
