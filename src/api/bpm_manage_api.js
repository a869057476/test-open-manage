import request from '@/utils/request'

function getItemCurLink() {
  return request({
    url: `/bpm/itemCurLink`,
    method: 'get'
  })
}

function getWorkShare() {
  return request({
    url: `/msc/quMsc`,
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

export default {
  getItemCurLink,
  getWorkShare,
  getTestUserNameAll,
  getUpdateTime,
  getBpmApprovalByParam,
  updateItemDesc,
  getBpmDetail
}
