import axios from 'axios'
import { message } from "antd";
import config from "@/app/untils/config";
import {getToken} from "@/app/untils/untils";


// create an axios instance
const service = axios.create({
  // 测试环境接口地址 在env.prodction文件中修改
  baseURL: config.baseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 12000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {

  config.headers.token = getToken()
  config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(response => {
    const res = response.data

    return res
  },
  error => {
    console.log('err' + error) // for debug
    message.error(error.msg)
    return Promise.reject(error)
  }
)
export default service
