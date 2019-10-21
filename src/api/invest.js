import request from '@/utils/request'

/**
 * 产品列表
 * @param {*} query
 */
export function list(query) {
  return request({
    url: '/invest/list',
    method: 'get',
    params: query
  })
}

/**
 * 放行
 * @param {*} query
 */
export function pass(data) {
  return request({
    url: '/invest/pass',
    method: 'post',
    data
  })
}

