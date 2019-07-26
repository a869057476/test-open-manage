import request from '@/utils/request'

function getStaffSysLvs(staffId, sysId, lvId) {
  return request({
    url: `/sys/staffs/${staffId}/systems/${sysId}/levels/${lvId}`,
    method: 'get'
  })
}

function setStaffSysLvs(data) {
  return request({
    url: `/sys/permissions`,
    method: 'post',
    data
  })
}

function addMenu(data) {
  return request({
    url: `/sys/menus`,
    method: 'post',
    data
  })
}

function delMenu(data) {
  return request({
    url: `/sys/menus`,
    method: 'delete',
    data
  })
}

function updateMenu(data) {
  return request({
    url: `/sys/menus`,
    method: 'put',
    data
  })
}

function getMenuModules(menuParentId) {
  return request({
    url: `/sys/menus/${menuParentId}`,
    method: 'get'
  })
}

export default {
  getStaffSysLvs,
  setStaffSysLvs,
  addMenu,
  delMenu,
  updateMenu,
  getMenuModules
}
