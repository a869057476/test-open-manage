import request from '@/utils/request'

export function getStaffSysLvs(staffId, sysId, lvId) {
  return request({
    url: `/sys/staffs/${staffId}/systems/${sysId}/levels/${lvId}`,
    method: 'get'
  })
}

export function setStaffSysLvs(data) {
  return request({
    url: `/sys/permissions`,
    method: 'post',
    data
  })
}
