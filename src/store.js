import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = window.localStorage

const store = new Vuex.Store({
  state: {
    loading: false,
    theresponse: {
      message: '',
      status: 3,
    },
    token: '',
    user_info: '',
  },
  getters: {
    userInfo: (state) => {
      const data = state
      if (data.user_info === '') {
        data.user_info = storage.getItem('user_info') !== null ? storage.getItem('user_info') : ''
      }
      if (data.user_info === '') {
        return data.user_info
      }
      return JSON.parse(data.user_info)
    },
    token: (state) => {
      const data = state
      if (data.token === '') {
        data.token = storage.getItem('token') !== null ? storage.getItem('token') : ''
      }
      return data.token
    },

  },
  mutations: {
    newUserInfo(state, data) {
      const stateData = state
      storage.setItem('user_info', data)
      stateData.user_info = data
    },
    removeUserInfo(state) {
      const stateData = state
      storage.removeItem('user_info')
      stateData.user_info = ''
    },
    tokenExpire(state) {
      const stateData = state
      storage.removeItem('token')
      stateData.token = ''
    },
    tokenNew(state, data) {
      const stateData = state
      storage.setItem('token', data)
      stateData.token = data
    },
    loading_on(state) {
      const stateData = state
      stateData.loading = true
    },
    loading_off(state) {
      const stateData = state
      stateData.loading = false
    },
    responseMessage(state, message) {
      const stateData = state
      stateData.theresponse.message = message
    },
    responseStatus(state, status) {
      const stateData = state
      stateData.theresponse.status = status
    },
  },
  actions: {
    responseStatus(state, response) {
      state.commit('loading_off')
      state.commit('responseMessage', response[0])
      state.commit('responseStatus', response[1])
      setTimeout(() => {
        state.commit('responseMessage', '')
        state.commit('responseStatus', 3)
      }, 5000)
    },
  },
})

export default store
