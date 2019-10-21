import request from '@/utils/request'

/**
 * 收益列表
 * @param {*} query
 */
export function list(query) {
  return request({
    url: '/output/list',
    method: 'get',
    params: query
  })
}
