import request from '@/utils/request'

function downloadRequire(data) {
  return request({
    url: `/pf/requirement/download`,
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

function getSysNameList() {
  return request({
    url: `/pf/requirement/sysNames`,
    method: 'get'
  })
}

function getSysSonNameList(data) {
  return request({
    url: '/pf/requirement/sonSysNames',
    method: 'post',
    params: data
  })
}

function getRequireList(data) {
  return request({
    url: '/pf/requirement/list',
    method: 'post',
    data
  })
}

function getProjectList(data) {
  return request({
    url: '/pf/requirement/redmineProject/list',
    method: 'post',
    data
  })
}

function updateRedmineProject(data) {
  return request({
    url: '/pf/requirement/updateRedmineProject',
    method: 'post',
    data
  })
}

function updateRequireVersion(data) {
  return request({
    url: '/pf/requirement/updateTestversion',
    method: 'post',
    data
  })
}

export default {
  downloadRequire,
  getSysNameList,
  getSysSonNameList,
  getRequireList,
  getProjectList,
  updateRedmineProject,
  updateRequireVersion
}
