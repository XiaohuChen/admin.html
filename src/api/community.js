import request from '@/utils/request'

/**
 * 产品列表
 * @param {*} query
 */
export function list(query) {
  return request({
    url: '/community/list',
    method: 'get',
    params: query
  })
}

export function getLevel(query) {
  return request({
    url: '/community/get',
    method: 'get',
    params: query
  })
}

export function edit(query) {
  return request({
    url: '/community/edit',
    method: 'get',
    params: query
  })
}

export function add(query) {
  return request({
    url: '/community/add',
    method: 'get',
    params: query
  })
}

