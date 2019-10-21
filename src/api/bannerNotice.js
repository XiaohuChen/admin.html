import request from '@/utils/request'

/**
 * 获取banner列表
 * @param {*} query
 */
export function bannerList(query) {
  return request({
    url: '/bannerNotice/bannerList',
    method: 'get',
    params: query
  })
}

/**
 * 添加banner
 * @param {*} data
 */
export function bannerAdd(data) {
  return request({
    url: '/bannerNotice/bannerAdd',
    method: 'post',
    data
  })
}

/**
 * 更新banner
 * @param {*} data
 */
export function bannerUpdate(data) {
  return request({
    url: '/bannerNotice/bannerUpdate',
    method: 'post',
    data
  })
}

/**
 * 删除banner
 * @param {*} data
 */
export function bannerDelete(id) {
  return request({
    url: '/bannerNotice/bannerDelete',
    method: 'get',
    params: { id }
  })
}



/**
 * 获取一篇banner
 * @param {*} data
 */
export function getBanner(id) {
  return request({
    url: '/bannerNotice/getBanner',
    method: 'get',
    params: { id }
  })
}


/**
 * 获取公告列表
 * @param {*} query
 */
export function noticeList(query) {
  return request({
    url: '/bannerNotice/noticeList',
    method: 'get',
    params: query
  })
}

/**
 * 编辑公告
 * @param {*} query
 */
export function noticeUpdate(data) {
  return request({
    url: '/bannerNotice/noticeUpdate',
    method: 'post',
    data
  })
}

/**
 * 删除公告
 * @param {*} data
 */
export function noticeDelete(id) {
  return request({
    url: '/bannerNotice/noticeDelete',
    method: 'get',
    params: { id }
  })
}

/**
 * 添加公告
 * @param {*} query
 */
export function noticeAdd(data) {
  return request({
    url: '/bannerNotice/noticeAdd',
    method: 'post',
    data
  })
}

/**
 * 获取一篇公告
 * @param {*} data
 */
export function getNotice(id) {
  return request({
    url: '/bannerNotice/getNotice',
    method: 'get',
    params: { id }
  })
}
