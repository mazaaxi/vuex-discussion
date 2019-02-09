import Vue from 'vue'
import AppPage from '@/index.vue'
import '@/logic'

new Vue({
  render: h => h(AppPage),
}).$mount('#app')
