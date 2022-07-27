<template>
  <!-- 布局包含一个图片，图片右上角显示内容，图片下方显示描述 -->
    <!-- 点击跳转到歌单页面 -->
    <div class="musicitem" v-for="item in recommendList" :key="item.id" @click="toDetails(item.id)">
      <div class="musicitem-top">
        <img :src="item.picUrl" />
        <more :contentStr="process(item.playCount)" class="recommend-more"></more>
      </div>
      <div class="musicitem-bottom">{{ item.name }}</div>
    </div>
</template>

<script>
import More from "@/components/More/More";
import { convertNum } from "@/utils/process";


import {useRouter} from 'vue-router'
import {getCurrentInstance,ref,onMounted} from 'vue'
//音乐项，可复用
export default {
  name: "MusicItem",
  components: {
    More,
  },
  setup() {
    const instance =getCurrentInstance()
    const bus=instance.appContext.config.globalProperties.$bus
    const recommendList=ref([])
    onMounted(()=>{
      bus.on('recommendList',(value)=>{
        recommendList.value=value
      })
    })
    const router=useRouter()
    function process(val) {
      return convertNum(val);
    }
    function toDetails(id){
      router.push({path:'/playlist',query:{id:id}})
    }
    return {
      process,
      toDetails,
      recommendList
    };
  },
};
</script>

<style lang="scss" scoped>

  .musicitem {
    margin: 0 0.5rem;
    width: 7rem;
    height: 7rem;
    position: relative;
    .recommend-more{
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
        color: #fff;
    }
    img {
      width: 7rem;
      border-radius: 0.7rem;
    }
    .musicitem-bottom {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

</style>
