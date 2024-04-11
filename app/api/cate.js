import request from "@/app/untils/request";

export const addCate = data => {
  return request({
    url:'/addCate',
    method:'post',
    data
  })
}

export const getCate = params => {
  return request({
    url:'/getCate',
    method:'get',
    params
  })
}

export const delCate = data => {
  return request({
    url:'/delCate',
    method:'post',
    data
  })
}

export const editCate = data => {
  return request({
    url:'/editCate',
    method:'post',
    data
  })
}