<template>
  <div class="musicList">
    <div class="playItem" :key="item.id" v-for="(item, index) in playListMusic" @click="play(item)">
      <div class="left">
        <div class="index">{{ index + 1 }}</div>
        <div class="musicInfo">
          <div class="title">{{ item.name }}</div>
          <p class="author">{{ item.ar[0].name }}-{{ item.al.name }}</p>
        </div>
      </div>
      <div class="right">
        <el-icon class="video"><VideoPlay /></el-icon>
        <el-icon class="select"><MoreFilled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance} from 'vue'

//用于显示歌单的音乐列表
export default {
  name: "MusicList",
  props: ["playListMusic"],
  setup(){
    const instance=getCurrentInstance()
    const bus=instance.appContext.config.globalProperties.$bus
    function play(music){
      bus.emit('musicplay',music)
    }
    return {
      play
    }
  }
};
</script>

<style lang="scss" scoped>
.musicList {
  padding-bottom: 3rem;
  .playItem {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    background-color: #fff;
    border: none;
    .left {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      .index {
        font-size: 1.2rem;
        font-weight: 300;
        color: #999999;
      }
      .musicInfo {
        width: 13rem;
        margin-left: 1.6rem;
        font-family: "Times New Roman";
        .title {
          font-size: 1.2rem;
          color: #000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .author {
          margin-top: 0.4em;
          color: #999999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .right{
      width: 5.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      padding-right: 1.8rem;
      font-size: 1.3rem;
    }
  }
}
</style>
