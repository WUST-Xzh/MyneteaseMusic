<template>
  <div class="banner" >
    <el-carousel trigger="click" height="11rem">
      <el-carousel-item v-for="item in bannerList" :key="item.targetId">
        <img :src="item.pic" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
// 轮播图
export default{
  name:'Banner',
  props:['bannerList']
}

</script>

<style lang="scss" scoped>
.banner{
  margin: 0 0.5rem;
  img{
    width: 100%;
    height: 90%;
    border-radius: 0.6rem;        
  }
}
</style>