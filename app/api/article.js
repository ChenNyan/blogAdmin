import request from "@/app/untils/request";

export const addArticle = data => {
  return request({
    url:'/addArticle',
    method:'post',
    data
  })
}

export const getArticle = params => {
  return request({
    url:'/getArticle',
    method:'get',
    params
  })
}

export const delArticle = data => {
  return request({
    url:'/delArticle',
    method:'post',
    data
  })
}

export const editArticle = data => {
  return request({
    url:'/editArticle',
    method:'post',
    data
  })
}