import request from '@/utils/request'

export function getTest(params) {
  return request.get(`/get_pdb_flag_name/?pdb_flag=67`)
}

export function getTestList(params) {
  return request({
    url: '/mock-api/test/list',
    method: 'get',
    params
  })
}
