import request from '@/utils/request'

function getItemCurLink() {
  return request({
    url: `/bpm/itemCurLink`,
    method: 'get'
  })
}

function getTestUserNameAll() {
  return request({
    url: `/bpm/testUserName`,
    method: 'get'
  })
}

function getUpdateTime() {
  return request({
    url: `/bpm/updateTime`,
    method: 'get'
  })
}

function getBpmApprovalByParam(data) {
  return request({
    url: '/bpm/bpmApprovalByParam',
    method: 'post',
    data
  })
}

function updateItemDesc(data) {
  return request({
    url: '/bpm/itemDesc',
    method: 'post',
    data
  })
}

function getBpmDetail(data) {
  return request({
    url: '/bpm/bpmApprovalDetail',
    method: 'post',
    data
  })
}

function getCurrentBpm(data) {
  return request({
    url: '/bpm/bpmApproval/list',
    method: 'post',
    data
  })
}

function getReqNumList() {
  return request({
    url: '/bpm/itemReqRun/lists',
    method: 'get'
  })
}

function downloadBpm(data) {
  return request({
    url: `/bpm/exportBpmApproval`,
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

function downloadCurrentBpm() {
  return request({
    url: `/bpm/exportBpmApprovalMonitor`,
    method: 'post',
    responseType: 'blob'
  })
}

function ignoreBpmBatch(data) {
  return request({
    url: '/bpm/batchIgnor',
    method: 'post',
    data
  })
}

function getWorkShare() {
  return request({
    url: `/msc/quMsc`,
    method: 'get'
  })
}

function opdateWorkShare(data) {
  return request({
    url: '/msc/upMsc',
    method: 'post',
    data
  })
}

export default {
  getItemCurLink,
  getTestUserNameAll,
  getUpdateTime,
  getBpmApprovalByParam,
  updateItemDesc,
  getBpmDetail,
  getCurrentBpm,
  getReqNumList,
  downloadBpm,
  downloadCurrentBpm,
  ignoreBpmBatch,
  getWorkShare,
  opdateWorkShare
}
