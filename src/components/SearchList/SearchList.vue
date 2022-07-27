<template>
  <div class="search-list">
        <div>热搜榜</div>
        <div>话题榜</div>
        <div>播客榜</div>
        <div>视频榜</div>
      </div>
      <div class="list-content">
        <!-- 热搜榜内容 -->
        <list :listInfo="listInfo"></list>
      </div>
</template>

<script>
import List from "@/components/List/List";
import {getCurrentInstance,ref} from 'vue'
export default{
  name:'SearchList',
  components:{
    List
  },
  setup(){
    const listInfo=ref([])
    const instance=getCurrentInstance()
    const bus=instance.appContext.config.globalProperties.$bus
    bus.on('searchList',(val)=>{
      listInfo.value=val
    })
    return {
      listInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.search-list {
    height: 2rem;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .list-content {
    position: relative;
    margin-top: 0.5rem;
    width: 100%;
    border-radius: 0.7rem;
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #f5f5f5,
      -0.1rem -0.1rem 0.1rem 0.1rem #f5f5f5;
    padding: 1rem 0 2.5rem 1rem;
  }
</style>