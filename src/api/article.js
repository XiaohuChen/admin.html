import request from '@/utils/request'

/**
 * 获取分类列表
 * @param {*} query
 */
export function getCate(query) {
  return request({
    url: '/article/getCate',
    method: 'get',
    params: query
  })
}

/**
 * 添加分类
 * @param {*} data
 */
export function addCate(data) {
  return request({
    url: '/article/addCate',
    method: 'post',
    data
  })
}

/**
 * 更新分类
 * @param {*} data
 */
export function updateCate(data) {
  return request({
    url: '/article/updateCate',
    method: 'post',
    data
  })
}

/**
 * 删除分类
 * @param {*} data
 */
export function deleteCate(id) {
  return request({
    url: '/article/deleteCate',
    method: 'get',
    params: { id }
  })
}

/**
 * 获取文章列表
 * @param {*} query
 */
export function articleList(query) {
  return request({
    url: '/article/articleList',
    method: 'get',
    params: query
  })
}

/**
 * 编辑文章
 * @param {*} query
 */
export function updateArticle(data) {
  return request({
    url: '/article/updateArticle',
    method: 'post',
    data
  })
}

/**
 * 删除文章
 * @param {*} data
 */
export function deleteArticle(id) {
  return request({
    url: '/article/deleteArticle',
    method: 'get',
    params: { id }
  })
}

/**
 * 添加文章
 * @param {*} query
 */
export function addArticle(data) {
  return request({
    url: '/article/addArticle',
    method: 'post',
    data
  })
}

/**
 * 获取一篇文章
 * @param {*} data
 */
export function getArticle(query) {
  return request({
    url: '/article/getArticle',
    method: 'get',
    params: query
  })
}

/**
 * 获取一个答疑
 * @param {*} data
 */
export function questionGet(query) {
  return request({
    url: '/article/questionGet',
    method: 'get',
    params: query
  })
}


/**
 * 获取答疑列表
 * @param {*} query
 */
export function questionList(data) {
  return request({
    url: '/article/questionList',
    method: 'post',
    data
  })
}

/**
 * 删除答疑
 * @param {*} data
 */
export function questionDel(query) {
  return request({
    url: '/article/questionDel',
    method: 'get',
    params: query
  })
}

/**
 * 编辑答疑
 * @param {*} data
 */
export function questionEdit(data) {
  return request({
    url: '/article/questionEdit',
    method: 'post',
    data
  })
}
