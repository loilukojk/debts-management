import Vue from 'vue'
import axios from 'axios'
import DebtsAPI from './debts.api'
import UsersAPI from './users.api'

const api = axios.create({
  baseURL: 'http://localhost:80/api'
})

Vue.prototype.$instanceDebtsAPI = new DebtsAPI(api)
Vue.prototype.$instanceUsersAPI = new UsersAPI(api)
