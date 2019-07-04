import request from '@/utils/request'

export function getTest(params) {
  return request.get(`/oms/user/account/trade/list?accountName=${params}`)
}

export function getTestList(params) {
  return request({
    url: '/mock-api/test/list',
    method: 'get',
    params
  })
}
