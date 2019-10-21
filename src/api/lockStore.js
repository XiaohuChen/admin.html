import request from '@/utils/request'



//锁仓规则
export function lockStoreList(query) {
  return request({
    url: '/lockStore/lockStoreList',
    method: 'get',
    params: query
  })
}

//锁仓规则配置
export function lockStoreEdit(data) {
  return request({
    url: '/lockStore/lockStoreEdit',
    method: 'post',
    data
  })
}


//会员锁仓记录
export function lockStoreMemberList(query) {
  return request({
    url: '/lockStore/lockStoreMemberList',
    method: 'get',
    params: query
  })
}

//会员锁仓奖励列表
export function lockStoreRewaraLog(query) {
  return request({
    url: '/lockStore/lockStoreRewaraLog',
    method: 'get',
    params: query
  })
}


//释放记录
export function IAFreeLog(query) {
  return request({
    url: '/lockStore/IAFreeLog',
    method: 'get',
    params: query
  })
}

//产出记录
export function IAOutput(query) {
  return request({
    url: '/lockStore/IAOutput',
    method: 'get',
    params: query
  })
}

