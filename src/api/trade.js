import request from '@/utils/request'



//交易记录
export function IATradeList(query) {
  return request({
    url: '/Trade/IATradeList',
    method: 'get',
    params: query
  })
}
