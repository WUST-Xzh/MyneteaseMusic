<template>
  <div class="list">
    <!-- 布局：两栏十个，前三个为红+黑 -->
    <div class="Info" :class="{'select':currentIndex===index}" v-for="(item, index) in listInfo" :key="item.score" @click="navClick(index)">
      <span class="index">{{ index + 1 }}</span>
      <span class="hotwords">{{ item.searchWord }}</span>
    </div>
    <span class="more">
      展开更多热搜
      <el-icon><ArrowDown /></el-icon>
    </span>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "List",
  props: ["listInfo"],
  setup(){
    const currentIndex=ref(0)
    function navClick(index){
      console.log(currentIndex.value);
      currentIndex.value=index
    }
    return {
      currentIndex,
      navClick
    }
  }
};
</script>

<style lang="scss" scoped>
.list {

  display: grid;
  grid-template-columns: 0.8fr 1fr;
  .Info {
    display: flex;
    align-items: center;
    height: 2rem;
    &:nth-child(-n + 3) {
      .index {
        color: #ff7e7e;
      }
      .hotwords {
        font-weight: 700;
      }
    }
    .hotwords {
      margin-left: 0.8rem;
    }
  }
  .more{
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%);
  }
}
.select{
  font-weight: 700;
}
</style>
