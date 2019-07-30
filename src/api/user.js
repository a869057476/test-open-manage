import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/mock-api/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: '/sys/login',
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
    url: '/sys/logOut',
    method: 'get'
  })
}

export function updatePassword(data) {
  return request({
    url: '/sys/staffs',
    method: 'post',
    data
  })
}
