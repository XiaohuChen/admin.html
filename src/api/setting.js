import request from '@/utils/request'

// 等级配置
export function inviteList(query) {
  return request({
    url: '/setting/invite',
    method: 'get',
    params: query
  })
}

export function editInvite(data) {
  return request({
    url: '/setting/invite/edit',
    method: 'post',
    data
  })
}

// 回购比例和全球分红
export function world(query) {
  return request({
    url: '/setting/world',
    method: 'get',
    params: query
  })
}

// 编辑回购比例和全球分红
export function editWorld(data) {
  return request({
    url: '/setting/world/edit',
    method: 'post',
    data
  })
}

// 预约设置
export function plan(query) {
  return request({
    url: '/setting/plan',
    method: 'get',
    params: query
  })
}

// 修改预约设置
export function editPlan(data) {
  return request({
    url: '/setting/plan/edit',
    method: 'post',
    data
  })
}

