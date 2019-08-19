import axios from 'axios'

export function getTestList(params) {
  return axios({
    url: '/mock-api/test/list',
    method: 'get',
    params
  })
}

// 周报信息管理 联测主系统列表
export function getWeekReportList(params) {
  return axios({
    url: '/mock-api/week-report/list',
    method: 'get',
    params
  })
}
