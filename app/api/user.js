import request from "@/app/untils/request";

export const login = data => {
  return request({
    url:'/login',
    method:'post',
    data
  })
}