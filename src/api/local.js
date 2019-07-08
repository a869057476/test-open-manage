import request from '@/utils/request'

export function getTest(params) {
  return request.get(`/get_pdb_flag_name/?pdb_flag=67`)
}

// 获取需求条目信息
export function getRequirementEntryInfoReq(params) {
  return request.get(`/get_xqtm_info/?w_id=7692`)
}

export function getTestList(params) {
  return request({
    url: '/mock-api/test/list',
    method: 'get',
    params
  })
}
