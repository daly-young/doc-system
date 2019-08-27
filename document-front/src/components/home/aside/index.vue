<template>
  <el-aside width="200px">
    <template v-if="sideCategory">
      <el-menu 
        background-color="transparent" 
        text-color="#999" 
        active-text-color="#409EFF" 
        :default-active="'0'" 
        menu-trigger="click" 
        :unique-opened="true"
        @select="selectFn"
        id="demo">
        <tree-menus 
          v-for="(item,index) in sideCategory.list"
          :key="item.id"
          :item="item"
          :index="index.toString()"
          @getArtcile="getArticle"
        ></tree-menus>
      </el-menu>
    </template>
    <p v-else>暂无层级</p>
  </el-aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import treeMenus from './aside-menu'
export default {
  data() {
    return {
      list: [],
      breadNav:[]
    }
  },
  components: {
    // treeItem,
    treeMenus
  },
  computed:{
    ...mapState({
      sideCategory: state => state.sideCategory,
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
      // this.$store.dispatch('getArticle')
    },
    selectFn(index) {
      index  = index.split('-')
      this.breadNav = []

      // 转译为名称
      index.reduce((pre, cur) => {
        const list = pre.list
        this.breadNav.push(pre.title)
        if(!list.length) return
        return list[cur]
      }, this.sideCategory.list[index[0]])

      // 提交面包屑数据
      this.updateData({
        breadNav: this.breadNav
      })
    },
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
