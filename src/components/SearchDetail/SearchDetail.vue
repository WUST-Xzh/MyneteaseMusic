<template>
  <div class="searchDetail">
    <!-- 顶部导航栏 -->
    <div class="tabBar">
      <span class="tarBar-item" v-for="(item, index) in tabBar" :key="index">{{
        item
      }}</span>
    </div>
    <!-- 单曲列表 -->
    <div class="singleMusic">
      <div class="singleMusic-top">
        <span>单曲</span>
        <more :contentStr="'播放'"></more>
      </div>
      <div class="singleMusic-bottom">
        <div class="singMusic-item" v-for="item in singleMusic">
        <div class="item-left">
          <span class="music-name">{{item.name}}</span>
          <span class="artist-name">{{getArtist(item.artists)}}</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance,inject} from 'vue'
import { reactive, toRefs } from "@vue/reactivity";

import More from '@/components/More/More'
export default {
  name: "SearchDetail",
  components:{
    More
  },
  setup() {
    const instance=getCurrentInstance()
    const bus=instance.appContext.config.globalProperties.$bus
    const state = reactive({
      tabBar: ["综合", "单曲", "歌单", "视频", "歌手", "播客"],
      singleMusic: []
    });
    state.singleMusic=inject('singleMusicDetails').singleMusicDetails
    console.log(state.singleMusic);

    function getArtist(arr){
      let res=''
      for(let i=0;i<arr.length;i++){
        if(i===arr.length-1){
          res+=arr[i].name
        }else{
          res+=arr[i].name+'/'
        }
      }
      return res
    }
    return {
      ...toRefs(state),
      getArtist
    };
  },
};
</script>

<style lang="scss" scoped>
.searchDetail {
  margin-top: 1rem;
 
  .tabBar {
    height: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .singleMusic{
    height: 25rem;
    overflow: scroll;
    padding: 0 1rem;
    border: 0.05rem solid #ccc;
     border-radius: 1rem;
    .singleMusic-top{
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.05rem solid #ccc;
      span{
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
    .singleMusic-bottom{
      margin-top: 0.5rem;
      .singMusic-item{
        height: 3rem;
        .item-left{
          display: flex;
          flex-direction: column;
          justify-content: center;
          .artist-name{
            font-size: 0.8rem;
            color: #D1D1D1;
          }
        }
      }
    }
  }
}
</style>
