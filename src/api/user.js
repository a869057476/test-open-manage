import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mock-api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/mock-api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/mock-api/user/logout',
    method: 'post'
  })
}
