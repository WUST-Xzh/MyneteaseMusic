import {request} from './index'

//根据关键词获取搜索内容
export function _getSearch(keywords){
  return request({
    url:'/search',
    params:{
      keywords
    }
  })
}

//获取搜索关键词
export function _getKeyword(){
  return request({
    url:'/search/default'
  })
}

//获取热搜列表
export function _getHotsearch(){
  return request({
    url:'/search/hot'
  })
}4

//获取热搜详细列表
export function _getHotSearchDetails(){
  return request({
    url:'/search/hot/detail'
  })
}

//获取搜索建议
export function _getSearchSuggest(keywords){
  return request({
    url:'/search/suggest',
    params:{
      keywords
    }
  })
}

//搜索多重匹配
export function _getSearchMultiMatch(keywords){
  return request({
    url:'/search/multimatch',
    params:{
      keywords
    }
  })
}

