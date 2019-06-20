<template>
  <el-aside width="200px">
    <el-menu background-color="transparent" text-color="#999" active-text-color="#409EFF" :default-active="activeIndex" menu-trigger="click">
      <el-menu-item :index="item.article_id.toString()" v-for="item in secondList" :key="item.article_id" @click="getArticle(item)">{{item.name}}</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      // list:[],
      // defaultIndex: '0'
    }
  },
  computed:{
    ...mapState({
      secondList: state => state.secondList,
      activeIndex: state => state.activeIndex_second,
    })
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    getArticle({article_id, name}) {
      // todo: 待优化
      this.updateData({
        curId: article_id,
        secondTitle: name,
      })
      this.$store.dispatch('getArticle')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100%;
  overflow-y: auto;
  // padding-left: 50px;
}
.el-menu {
  text-align: left;
  border: none;
  :hover {
    background-color: #fff!important;
  }
}
.el-menu-item {
  padding-left: 0!important;
}
</style>
