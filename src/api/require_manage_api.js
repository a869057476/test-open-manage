import request from '@/utils/request'

function downloadRequire(data) {
  return request({
    url: `/requirement/download`,
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

function getSysNameList() {
  return request({
    url: `/requirement/sysNames`,
    method: 'get'
  })
}

function getSysSonNameList(data) {
  return request({
    url: '/requirement/sonSysNames',
    method: 'post',
    params: data
  })
}

function getRequireList(data) {
  return request({
    url: '/requirement/list',
    method: 'post',
    data
  })
}

function updateRedmineProject(data) {
  return request({
    url: 'requirement/updateRedmineProject',
    method: 'post',
    data
  })
}

function updateRequireVersion(data) {
  return request({
    url: '/requirement/updateTestversion',
    method: 'post',
    data
  })
}

export default {
  downloadRequire,
  getSysNameList,
  getSysSonNameList,
  getRequireList,
  updateRedmineProject,
  updateRequireVersion
}
