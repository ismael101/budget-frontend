import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Profile from './views/profile/Profile.vue'
import Metric from './views/profile/Metric.vue'
import Main from './views/profile/Main'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'login',
      component:Login
    },
    {
      path:'/signup',
      name:'signup',
      component:Signup
    },
    {
      path:'/profile',
      component:Profile,
      name:'profile',
      children:[
        {
          path: 'metrics',
          component: Metric,
          name:'metric'

        },
        {
          path: '',
          component: Main,
          name:'main'
        }
      ]
    }
  ]
})
