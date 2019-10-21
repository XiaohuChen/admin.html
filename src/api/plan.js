import request from '@/utils/request'

/**
 * 等级列表
 * @param {*} query
 */
export function list(query) {
  return request({
    url: '/plan/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取等级
 * @param {*} query
 */
export function detail(query) {
  return request({
    url: '/plan/detail',
    method: 'get',
    params: query
  })
}

/**
 * 更新等级
 * @param {*} query
 */
export function edit(data) {
  return request({
    url: '/plan/edit',
    method: 'post',
    data
  })
}

/**
 * 添加等级
 * @param {*} query
 */
export function add(data) {
  return request({
    url: '/plan/add',
    method: 'post',
    data
  })
}
