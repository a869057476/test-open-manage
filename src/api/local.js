import request from '@/utils/request'

export function getTestList(params) {
  return request({
    url: '/mock-api/test/list',
    method: 'get',
    params
  })
}

// 周报信息管理 联测主系统列表
export function getWeekReportList(params) {
  return request({
    url: '/mock-api/week-report/list',
    method: 'get',
    params
  })
}
