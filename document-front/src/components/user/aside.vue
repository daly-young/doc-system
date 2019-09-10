<template>
  <el-aside width="200px">
    <el-menu background-color="transparent" text-color="#79BBFF" active-text-color="#409EFF" :default-active="activeIndex" menu-trigger="click">
      <el-menu-item 
        v-for="(item,index) in list"
        :key="item.id"
        :index="item.id.toString()"
        @click="selectFn(index)">{{item.name}}</el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '0',
      list:[{
        name: '创建记录',
        id: 0
      }, {
        name: '收藏记录',
        id: 1
      }, {
        name: '操作记录',
        id: 2
      }]
    }
  },
  created() {
    this.selectFn()
  },
  methods:{
    ...mapMutations( [
      'updateUser',
      'updateUserAside',
    ] ),
    ...mapActions( [
      'getUserHistory'
    ] ),
    selectFn( i ) {
      this.updateUser( {
        activeIndex: i
      } )
      this.updateUserAside()
      this.$store.dispatch( 'getUserHistory', {
        start: 0,
        size:12,
      } )
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #fff;
}
.el-menu {
  border: none;
}
</style>
