<template>
  <!-- 面包屑 -->
  <div class="breadcrumbBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="breadNav.length">
      <el-breadcrumb-item v-for="(item,index) in breadNav" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed:{
    ...mapState( {
        breadNav: state => state.breadNav
    } )
  },
}
</script>

<style lang="scss" scoped>
.breadcrumbBox {
  background-color:rgba(255,255,255,.95);
  overflow: hidden;
  padding: 20px 0;
}
.el-breadcrumb {
  float: left;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 0 20px;
  border-radius: 5px;
}
</style>

