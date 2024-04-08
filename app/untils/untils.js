import Cookies from 'js-cookie'

export const getStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const setStorage = (key,data) => {
  window.localStorage.setItem(key,JSON.stringify(data))
}


export function getToken() {
  return Cookies.get('token')
}

export function setToken(token) {
  return Cookies.set('token', token)
}
