import apiService from './apiService'
import store from '@/store'

const lstore = store
const accessService = {}

accessService.login = function (username, password) {
  lstore.commit('loading_on')
  return new Promise((resolve, reject) => {
    apiTrapsService.post('/login', {
      login: {
        username,
        password,
      }
    })
      .then(res => {
        lstore.commit('loading_off')
        lstore.commit('tokenNew', res.data.token)
        apiTrapsService.defaults.headers.common.Authorization = `Bearer ` + res.data.token
        resolve(true)
      }).catch(error => {
        lstore.commit('loading_off')
        reject(error.response.data)
      })
  })
}

export default accessService
