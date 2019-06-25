import Vue from 'vue'
// Bootstrap vue component
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
// Routes data
import router from './router'
// Vuex store data
import store from './store'
// Bootstrap css imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Api instance
import apiTrapsService from '@/services/api-traps'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

const storage = window.localStorage
const lstore = store

router.beforeEach((to, from, next) => {
  if (storage.getItem('token') !== null) {
    lstore.commit('tokenNew', storage.getItem('token'))
  }
  if (to.matched[0].meta.requiresAuth === true) {
    if (lstore.getters.token === '') {
      next({
        path: '/login',
      })
    } else {
      apiTrapsService.defaults.headers.common.Authorization = `Bearer ${lstore.getters.token}`
      next()
    }
  } else if (to.path === '/login') {
    if (lstore.getters.token !== '') {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
