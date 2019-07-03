import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mock-api/table/list',
    method: 'get',
    params
  })
}

export function getTest(params) {
  return request.get(`/oms/user/account/trade/list?accountName=${params}`)
}
