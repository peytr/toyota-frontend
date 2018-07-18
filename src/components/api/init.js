import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://toyota-backend-rtodfuwkmw.now.sh/api',
  withCredentials: true
})

export default instance