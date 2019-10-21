import request from '@/utils/request'

/**
 * 产品列表
 * @param {*} query
 */
export function list(query) {
  return request({
    url: '/product/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取系统币种
 * @param {} data
 */
export function getCoinList(query) {
  return request({
    url: '/product/getCoinList',
    method: 'get',
    params: query
  })
}

/**
 * 添加产品
 * @param {*} data
 */
export function add(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

/**
 * 修改产品
 * @param {*} data
 */
export function edit(data) {
  return request({
    url: '/product/edit',
    method: 'post',
    data
  })
}

/**
 * 获取一条产品记录
 * @param {} data
 */
export function getProduct(query) {
  return request({
    url: '/product/get',
    method: 'get',
    params: query
  })
}

/**
 * 活动列表列表
 * @param {} data
 */
export function productList(query) {
  return request({
    url: '/product/productList',
    method: 'get',
    params: query
  })
}

/**
 * 抢购记录列表
 * @param {} data
 */
export function recordList(query) {
  return request({
    url: '/product/recordList',
    method: 'get',
    params: query
  })
}

