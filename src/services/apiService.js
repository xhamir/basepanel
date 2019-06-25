import axios from 'axios'
import configService from './config'

let apiService = axios.create({
  baseURL: configService.apiUrl,
  crossdomain: true,
  responseType: 'json',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

export default apiTrapsService
