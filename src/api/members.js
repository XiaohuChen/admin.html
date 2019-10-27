import request from '@/utils/request'

/**
 * 会员列表
 */
export function membersList(query) {
  return request({
    url: '/members/list',
    method: 'get',
    params: query
  })
}

/**
 * 查看我的下级
 * @param {*} data
 */
export function subList(query) {
  return request({
    url: '/members/subList',
    method: 'get',
    params: query
  })
}

/**
 * 查看我的持币
 * @param {*} data
 */
export function holdCoin(mid) {
  return request({
    url: '/members/holdCoin',
    method: 'get',
    params: {
      mid
    }
  })
}

/**
 * 修改币种余额
 * @param {*} data
 */
export function memberCoinUpdate(data) {
  return request({
    url: '/members/memberCoinUpdate',
    method: 'post',
    data
  })
}

/**
 * 修改锁定余额
 * @param {*} data
 */
export function memberCoinLockMoney(data) {
  return request({
    url: '/members/memberCoinLockMoney',
    method: 'post',
    data
  })
}

/**
 * 禁用启用用户账号
 * @param {*} data
 */
export function membersStatus(query) {
  return request({
    url: '/members/membersStatus',
    method: 'get',
    params: query
  })
}

/**
 * 获取我的持币具体某一条
 * @param {*} data
 */
export function getCoinId(cid) {
  return request({
    url: '/members/getCoinId',
    method: 'get',
    params: {
      cid
    }
  })
}
/**
 * 获取资金流水
 * @param {*} data
 */
export function capitalMovements(query) {
  return request({
    url: '/members/capitalMovements',
    method: 'get',
    params: query
  })
}

/**
 * 获取资金流水
 * @param {*} data
 */
export function memberAddressList(query) {
  return request({
    url: '/members/memberAddressList',
    method: 'get',
    params: query
  })
}

/**
 * 更改会员VIP状态
 * @param {*} data
 */
export function memberVip(query) {
  return request({
    url: '/members/memberVip',
    method: 'get',
    params: query
  })
}

/**
 * 更改会员VIP状态
 * @param {*} data
 */
export function addCoin(query) {
  return request({
    url: '/members/addCoin',
    method: 'get',
    params: query
  })
}
/**
 * 修改用户备注码
 * @param {*} data
 */
export function memberRemark(data) {
  return request({
    url: '/members/memberRemark',
    method: 'post',
    data
  })
}

/**
 * 实名认证列表
 * @param {*} data
 */
export function membersAuthList(data) {
  return request({
    url: '/auth/list',
    method: 'post',
    data
  })
}

/**
 * 实名认证驳回
 * @param {*} data
 */
export function AuthReject(data) {
  return request({
    url: '/auth/reject',
    method: 'post',
    data
  })
}

/**
 * 实名认证通过
 * @param {*} data
 */
export function AuthPass(data) {
  return request({
    url: '/auth/pass',
    method: 'post',
    data
  })
}

