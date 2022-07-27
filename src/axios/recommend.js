import {request} from './index'

//获取推荐歌单列表
export function _getRecommendList(limit){
  return request({
    url:'/personalized',
    params:{
      limit
    }
  })
}