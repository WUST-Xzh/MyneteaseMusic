<template>
  <div class="player">
    <div class="player-left">
      <img ref="img" :src="musicInfo ? musicInfo.al.picUrl : imgUrl" />
      <span v-if="imgUrl"
        >{{ musicInfo ? musicInfo.ar[0].name : author }}-{{
          musicInfo ? musicInfo.name : name
        }}</span
      >
    </div>
    <div class="player-right">
      <el-icon @click="musicControl">
        <VideoPause v-if="musicPlay" />
        <VideoPlay v-else />
      </el-icon>
      <span @click="openPlaylist" class="iconfont icon-liebiao"></span>
    </div>
    <audio
      :src="url ? url : musicUrl"
      autoplay
      ref="audio"
      @canplay="getAudioInfo"
      @ended="musicEnd"
    ></audio>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, ref, onMounted, onUpdated } from "vue";

import { _getPlay } from "@/axios/musicList";
//底部播放组件
export default {
  name: "BottomPlay",
  props: ["url", "musicInfo"],
  setup(props) {
    onUpdated(()=>{
       console.log(props);
    })
   
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    const MusicInfo = reactive({
      id: "",
      author: "",
      name: "",
      imgUrl: "",
      musicUrl: "",
    });

    const state = reactive({
      audio: null, //获取音频
      img: null, //获取图片元素
      durationRef: 0, //音乐时长
      musicProcess: null, //播放进度
      musicPlay: null, //音乐是播放还是暂停状态
    });
    let imgProxy = ref(null);
    let imgStyle = ref(null);
    onMounted(() => {
      imgProxy = state.img;
    });

    bus.on("musicplay", async (item) => {
      console.log(item);
      MusicInfo.id = item.id;
      MusicInfo.author = item.ar[0].name;
      MusicInfo.name = item.name;
      MusicInfo.imgUrl = item.al.picUrl;
      await _getPlay(item.id).then((res) => {
        console.log(res);
        MusicInfo.musicUrl = res.data.data[0].url;
        state.musicPlay = true;
        imgStyle = imgProxy.animate(
          [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
          {
            easing: "linear",
            duration: 10000,
            iterations: Infinity,
          }
        );
      });
    });

    //获取音频的时长
    const getAudioInfo = () => {
      state.durationRef = state.audio.duration;
      //console.log(state.durationRef);
    };

    //底部控制音乐播放
    const musicControl = () => {
      imgProxy = state.img;
      //如果当前为暂停状态，那么就播放音乐
      if (state.audio.paused) {
        state.audio.play();
        state.musicPlay = true;
        imgStyle.play();
      } else {
        state.audio.pause();
        state.musicPlay = false;
        imgStyle.pause();
      }
    };

    //播放完毕停止旋转，并改变图标
    const musicEnd = () => {
      state.musicPlay = false;
      imgStyle.pause();
    };

    //点击一首歌，会将当前歌单所有歌添加到歌单列表中，并标红正在播放的歌曲
    //点击全部播放，从第一首歌开始播放，清空之前的列表，添加新列表
    const openPlaylist = () => {
      bus.emit("openListMenu");
    };
    return {
      ...toRefs(MusicInfo),
      ...toRefs(state),
      getAudioInfo,
      musicControl,
      musicEnd,
      openPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .player-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
    }
    span {
      width: 12rem;
      margin-left: 0.6rem;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .player-right {
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    padding-right: 1.3rem;
    .el-icon {
      margin-right: 1.2rem;
    }
    .iconfont {
      font-size: 1.8rem;
    }
  }
  .playlist-menu {
    width: 15rem;
    height: 20rem;
    background-color: #000;
    position: fixed;
    bottom: 3rem;
    right: 0;
  }
}
@keyframes rotate {
  form {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
