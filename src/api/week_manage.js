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

function delMeetingRecord(data) {
  return request({
    url: '/pf/report/meetingRecord',
    method: 'delete',
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

function getMeetingRecordList(data) {
  return request({
    url: '/pf/report/meetingRecord/list',
    method: 'post',
    data
  })
}

export function getMeetingRecord(uuid) {
  return request({
    url: `/pf/report/meetingRecord/${uuid}`,
    method: 'get'
  })
}

export function getAllSys() {
  return request({
    url: `/sys/sysInfo`,
    method: 'get'
  })
}

export function getSonSysNames(sysName) {
  return request({
    url: `/sys/sonSysInfo/${sysName}`,
    method: 'get'
  })
}

export default {
  getWeekReportList,
  addWeekReport,
  delWeekReport,
  getWeekReport,
  updateWeekReport,
  addMeetingRecord,
  delMeetingRecord,
  updateMeetingRecord,
  getMeetingRecordList,
  getMeetingRecord,
  getAllSys,
  getSonSysNames
}
