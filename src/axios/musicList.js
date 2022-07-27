import {request} from './index'

//获取歌单的所有音乐
export function _getMusic(id){
  return request({
    url:'/playlist/detail',
    params:{
      id
    }
  })
}

//获取歌曲详情
export function _getMusicDetails(ids){
  return request({
    url:'/song/detail',
    params:{
      ids
    }
  })
}

//获取音乐播放
export function _getPlay(id){
  return request({
    url:'/song/url',
    params:{
      id
    }
  })
}