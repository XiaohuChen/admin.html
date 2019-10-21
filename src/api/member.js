import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/member/list',
    method: 'get',
    params: query
  })
}
