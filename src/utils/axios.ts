import axios from 'axios'

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL

export const AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

AxiosInstance.interceptors.request.use((config) => {
  return config
})
