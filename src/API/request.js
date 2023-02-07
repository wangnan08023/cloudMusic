// 封装发请求
import axios from 'axios'
// 创建axios实例，设定baseURL
const requests = axios.create({
  baseURL: 'http://192.168.31.162:8080/api',
  withCredentials: true, // 自动将cookie放置在请求中
  timeout: 5000
})
export default requests
