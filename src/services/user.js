import apiService from './apiService'
import store from '@/store'

const lstore = store
const userService = {}

userService.info = function () {
  lstore.commit('loading_on')
  return new Promise((resolve, reject) => {
    apiTrapsService.get('/user_info.json')
      .then(res => {
        lstore.commit('loading_off')
        resolve(res.data)
      }).catch(error => {
        lstore.commit('loading_off')
        reject(error.request.response.status)
      })
  })
}

export default userService
