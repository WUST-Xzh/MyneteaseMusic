<template>
  <div class="more">
    <span class="iconfont" :class="[contentStr=='播放'?'icon-bofang':'icon-24gl-play']"  v-if="contentStr!=='更多>'"></span>
    <span>{{contentStr}}</span>
  </div>
</template>

<script>

//公共组件，更多
export default{
  name:'More',
  props:['contentStr']
}
</script>

<style lang="scss" scoped>
.more{
  padding: 0 0.3rem;
  border-radius: 0.75rem;
  font-size: 0.4rem;
  line-height: 1.1rem;
  text-align: center;
  border:1px solid #ccc;
}
</style>