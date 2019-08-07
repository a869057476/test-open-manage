import request from '@/utils/request'

function getWeekReportList(data) {
  return request({
    url: '/pf/report/weekreports/list',
    method: 'post',
    data
  })
}

function addWeekReport(data) {
  return request({
    url: '/pf/report/weekreports',
    method: 'post',
    data
  })
}

function delWeekReport(data) {
  return request({
    url: '/pf/report/weekreports',
    method: 'delete',
    data
  })
}

export function getWeekReport(uuid) {
  return request({
    url: `/pf/report/weekreports/${uuid}`,
    method: 'get'
  })
}

function updateWeekReport(data) {
  return request({
    url: '/pf/report/weekreports',
    method: 'put',
    data
  })
}

function addMeetingRecord(data) {
  return request({
    url: '/pf/report/meetingRecord',
    method: 'post',
    data
  })
}

function updateMeetingRecord(data) {
  return request({
    url: '/pf/report/meetingRecord',
    method: 'put',
    data
  })
}

export default {
  getWeekReportList,
  addWeekReport,
  delWeekReport,
  getWeekReport,
  updateWeekReport,
  addMeetingRecord,
  updateMeetingRecord
}
