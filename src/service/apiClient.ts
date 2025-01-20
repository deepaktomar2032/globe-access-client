import axios from 'axios'
import { API_BASE_URL } from 'src/utils'

const createApiClient = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })

  return instance
}

const getApiClient = () => {
  return createApiClient()
}

export default getApiClient
