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
 * 获取快讯列表
 * @param {*} query
 */
export function newsList(query) {
  return request({
    url: '/bannerNotice/News',
    method: 'get',
    params: query
  })
}

/**
 * 获取快讯列表
 * @param {*} query
 */
export function qaList(query) {
  return request({
    url: '/bannerNotice/qa',
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
 * 编辑常见问题
 * @param {*} query
 */
export function qaUpdate(data) {
  return request({
    url: '/bannerNotice/qaUpdate',
    method: 'post',
    data
  })
}

/**
 * 编辑快讯
 * @param {*} query
 */
export function newsUpdate(data) {
  return request({
    url: '/bannerNotice/newsUpdate',
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
 * 删除快讯
 * @param {*} data
 */
export function newsDelete(id) {
  return request({
    url: '/bannerNotice/newsDelete',
    method: 'get',
    params: { id }
  })
}

/**
 * 删除常见问题
 * @param {*} data
 */
export function qaDelete(id) {
  return request({
    url: '/bannerNotice/qaDelete',
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

// 添加常见问题
export function qaAdd(data) {
  return request({
    url: '/bannerNotice/qaAdd',
    method: 'post',
    data
  })
}

/**
 * 添加快讯
 * @param {*} query
 */
export function newsAdd(data) {
  return request({
    url: '/bannerNotice/newsAdd',
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

/**
 * 获取调常见问题
 * @param {*} data
 */
export function getQa(id) {
  return request({
    url: '/bannerNotice/getQa',
    method: 'get',
    params: { id }
  })
}

/**
 * 获取一篇快讯
 * @param {*} data
 */
export function getNews(id) {
  return request({
    url: '/bannerNotice/getNews',
    method: 'get',
    params: { id }
  })
}

/**
 * 关于我们
 * @param {*} data
 */
export function AboutUs(id) {
  return request({
    url: '/bannerNotice/AboutUs',
    method: 'get',
    params: { id }
  })
}

/**
 * 关于我们修改
 * @param {*} data
 */
export function AboutUsEdit(query) {
  return request({
    url: '/bannerNotice/AboutUsEdit',
    method: 'get',
    params: query
  })
}

/**
 * 用户协议
 * @param {*} data
 */
export function MemberDoc(id) {
  return request({
    url: '/bannerNotice/MemberDoc',
    method: 'get',
    params: { id }
  })
}

/**
 * 用户协议修改
 * @param {*} data
 */
export function MemberDocEdit(query) {
  return request({
    url: '/bannerNotice/MemberDocEdit',
    method: 'get',
    params: query
  })
}

