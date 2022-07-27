import {createStore} from 'vuex'

export default createStore({
  state:{
    playlist:[],    //底部播放栏的播放列表
    currentIndex:0,   //当前播放的index
  },
  getters:{
    getCurrentIndex:function(state){
      return function(id){
        return state.playlist.findIndex(item=>item.id==id)
      } 
    }
  },
  mutations:{
    //设置歌单列表
    setPlaylist:function(state,value){
      state.playlist=value
    },
    //删除歌单列表
    delPlaylist:function(state,value){
      state.playlist.splice(value,1)
    },
    //清除歌单列表
    clearPlaylist:function(state){
      state.playlist=[]
    },
    //设置当前播放歌曲的索引
    setCurrentIndex:function(state,value){
      state.currentIndex=value
    }
  },
  actions:{
    
  },
  modules:{}
})