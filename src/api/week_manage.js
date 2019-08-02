import request from '@/utils/request'

function getWeekReportList(data) {
  return request({
    url: '/pf/report/weekreports/list',
    method: 'post',
    data
  })
}

export default {
  getWeekReportList
}
