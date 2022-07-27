<template>
  <div class="playlist">
    <div class="shadow" ref="bg">
      <img class="bg" :src="playListInfo.coverImgUrl" />
      <!-- 顶部导航栏 -->
      <navbar class="playlist-nav">
        <template v-slot:left>
          <el-icon @click="back"><Back /></el-icon>
        </template>
        <template v-slot:center>
          <span>歌单</span>
          <el-icon><Search /></el-icon>
        </template>
        <template v-slot:right>
          <el-icon><MoreFilled /></el-icon>
        </template>
      </navbar>
      <!-- 页面信息 -->
      <div class="playlist-info">
        <!-- 左边图片 -->
        <div class="playlist-info-left">
          <img
            class="playlist-info-playcount"
            :src="playListInfo.coverImgUrl"
            alt=""
          />
          <more
            :contentStr="process(playListInfo.playCount)"
            class="playcount"
          ></more>
        </div>
        <!-- 右边歌单信息 -->
        <div class="playlist-info-right">
          <!-- 歌单名字 -->
          <p>{{ playListInfo.name }}</p>
          <!-- 歌单创建者信息 -->
          <div class="creater" v-if="playListInfo.creator">
            <el-avatar :src="playListInfo.creator.avatarUrl" :size="30" />
            <span class="username">{{ playListInfo.creator.nickname }}</span>
          </div>
          <span class="description">{{ playListInfo.description }}</span>
        </div>
      </div>

      <!-- 歌单列表 -->
      <!-- 依旧是一个导航栏 -->
      <navbar class="playlist-musiclist">
        <template v-slot:left>
          <el-icon><VideoPlay /></el-icon>
        </template>
        <template v-slot:center>
          <span class="playAll">播放全部</span>
          <span class="playAllCount">({{ playListInfo.trackCount }})</span>
          <el-icon><Download /></el-icon>
        </template>
        <template v-slot:right>
          <el-icon><Edit /></el-icon>
        </template>
      </navbar>
      <!-- 歌曲信息 -->
      <music-list :playListMusic="playListMusic"></music-list>
      <!-- 底部播放组件 -->
      <bottom-play :url="url" :musicInfo="musicInfo"></bottom-play>
    </div>
    <!-- 播放列表 -->
    <div v-if="menuShow" class="playlist-menu">
      <!-- 分为左右两部分,左边为歌曲名,右边为删除 -->
      <div
        class="menuShow-musiclist"
        v-for="(item, index) in $store.state.playlist"
        :key="item.id"
      >
        <div class="menuShow-left">
          <!-- 当前播放歌曲 -->
          <el-icon
            v-if="$store.state.currentIndex == index"
            class="currentMusic"
            ><Histogram
          /></el-icon>
          <span
            :class="{ currentMusic: $store.state.currentIndex == index }"
            class="music-name"
            >{{ item.name }}</span
          >
          <span
            :class="{ currentMusic: $store.state.currentIndex == index }"
            class="author-name"
          >
            - {{ item.ar[0].name }}</span
          >
        </div>
        <div class="menuShow-right">
          <el-icon @click="deleteMusic(index)"><Close /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _getMusic, _getMusicDetails } from "@/axios/musicList";

import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import Navbar from "@/components/Navbar/Navbar";
import More from "@/components/More/More";
import MusicList from "@/components/MusicList/MusicList";
import BottomPlay from "@/components/BottomPlay/BottomPlay";

import cloneDeep from "lodash/cloneDeep";
import { convertNum } from "@/utils/process";

import { _getPlay } from "@/axios/musicList";

export default {
  name: "playlist",
  components: {
    Navbar,
    More,
    MusicList,
    BottomPlay,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      playListInfo: [], //歌单信息
      playListMusic: [], //歌单所有歌曲信息
      menuShow: false, //用于展示歌单列表
      bg: null,
      url: "", //歌曲所有信息
      musicInfo: "",
    });
    const storeplaylist = computed(() => store.state.playlist); //vuex播放列表
    const currentIndex = computed(() => store.state.currentIndex); //正在播放歌曲的索引
    const instance = getCurrentInstance();
    const bus = instance.appContext.config.globalProperties.$bus;
    onMounted(async () => {
      await _getMusic(route.query.id)
        .then((res) => {
          const data = res.data.playlist;
          state.playListInfo = data;
          // console.log(data);
          let id = [];
          data.trackIds.forEach((item) => {
            id.push(item.id);
          });
          return _getMusicDetails(id.join(","));
        })
        .then((res) => {
          console.log(res);
          state.playListMusic = res.data.songs; //所有歌曲的信息
          //不应该是点击进来就添加歌单，而是点击播放才添加
        });
    });
    function process(val) {
      return convertNum(val);
    }
    function back() {
      router.go(-1);
    }

    const display = ref("none");
    bus.on("openListMenu", () => {
      state.menuShow = !state.menuShow;
      //还要给背景添加蒙版
      // bgProxy.style.filter = "blur(0.2rem)";
      if (state.menuShow) {
        display.value = "inline-block";
      } else {
        display.value = "none";
      }
    });

    //接收点击播放事件
    bus.on("musicplay", (music) => {
      //先清空列表，再添加歌单

      store.commit("clearPlaylist");
      store.commit("setPlaylist", cloneDeep(state.playListMusic));
      //获取当前播放音乐的索引,给当前播放音乐添加样式
      const getIndex = computed(() =>
        store.getters["getCurrentIndex"](music.id)
      );
      store.commit("setCurrentIndex", getIndex.value);
    });

    //删除歌单音乐，就是改变vuex中存储的playlist
    function deleteMusic(index) {
      store.commit("delPlaylist", index);
      //如果删除的歌曲正在播放，那么自动播放下一首歌
      if (currentIndex.value === index) {
        //   store.commit('setCurrentIndex',index+1)
        //获取下一首歌的链接,改变音频和歌曲信息
        _getPlay(storeplaylist.value[index].id).then((res) => {
          console.log(res);
          state.url = res.data.data[0].url;
          //playlistmusic有歌曲信息
          console.log(
            state.playListMusic.filter(
              (item) => item.id === storeplaylist.value[index].id
            )
          );
          state.musicInfo = JSON.parse(
            JSON.stringify(
              state.playListMusic.filter(
                (item) => item.id === storeplaylist.value[index].id
              )
            )
          )[0];
        });
      }
    }
    return {
      ...toRefs(state),
      process,
      back,
      deleteMusic,
      display,
      currentIndex,
      storeplaylist,
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  color: #fff;
  .shadow::before {
    content: " ";
    display: v-bind(display);
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    pointer-events: none;
  }
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: auto;
    filter: blur(2.5rem);
  }
  .playlist-nav {
    margin: 0 0.5rem;
  }
  .el-icon {
    font-size: 1.5rem;
  }
  .playlist-info {
    display: flex;
    margin: 0 1rem;
    .playlist-info-left {
      position: relative;
      img {
        width: 8rem;
        aspect-ratio: 1;
        border-radius: 1rem;
      }
      .playcount {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
      }
    }
    .playlist-info-right {
      margin-left: 1rem;
      .creater {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        .username {
          font-size: 0.8rem;
          padding-left: 0.5rem;
        }
      }
      .description {
        display: block;
        width: 10rem;
        margin-top: 1.3rem;
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .playlist-musiclist {
    margin-top: 2rem;
    border-radius: 0.8rem 0.8rem 0 0;
    padding: 0 0.5rem;
    background-color: #fff;
    .el-icon {
      color: #000;
    }
  }
  .playAll {
    color: #000;
    font-size: 1.3rem;
    font-weight: 900;
    margin-left: -1rem;
  }
  .playAllCount {
    color: #ccc;
    font-size: 0.8rem;
    margin-left: -5rem;
  }
  .playlist-menu {
    width: 21rem;
    height: 25rem;
    border-radius: 2rem;
    position: fixed;
    right: 1.3rem;
    bottom: 4rem;
    background-color: #fff;
    overflow: scroll;
    padding: 1rem 1.5rem;
    z-index: 3;
    &::-webkit-scrollbar {
      width: 0;
    }
    .menuShow-musiclist {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      line-height: 3rem;
      .menuShow-left {
        display: flex;
        align-items: center;
        width: 15rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .el-icon {
          margin-right: 0.5rem;
        }
        .currentMusic {
          color: red !important;
        }
        .music-name {
          color: #000;
          font-size: 1.2rem;
        }
        .author-name {
          color: #858585;
        }
      }
      .menuShow-right {
        color: #858585;
      }
    }
  }
}
</style>
