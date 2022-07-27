import {request} from './index.js'

//获取轮播图的数据
export function _getbanner(type){
  return request({
    url:'/banner',
    params:{
      type
    }
  })
}