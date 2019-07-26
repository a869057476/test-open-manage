import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setLogin(type) {
  return Cookies.set('isLogin', type)
}

export function getLogin() {
  return Cookies.get('isLogin')
}

export function setUserInfo(data) {
  return Cookies.set('userInfo', data)
}

export function getUserInfo() {
  return Cookies.get('userInfo')
}
