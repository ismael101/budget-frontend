import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  created(){
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
