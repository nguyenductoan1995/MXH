/* eslint-disable max-len */
import axios from 'axios'
import { API_ENDPOINTS, prettifyEndpoint } from 'config/endpoints'
import { get } from 'lodash'

export const loginAPI = (params) => axios.get(prettifyEndpoint(API_ENDPOINTS.auth.login), { headers: params })

export const API = {
  loginAPI,
}
