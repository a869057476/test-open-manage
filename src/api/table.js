import axios from 'axios'

export function getList(params) {
  return axios({
    url: '/mock-api/table/list',
    method: 'get',
    params
  })
}
