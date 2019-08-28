<template>
  <div class="breadcrumbBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in breadNav" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
      breadNav: []
    }
  },
  computed:{
    ...mapState({
      selectIndex: state => state.selectIndex,
      sideCategory: state => state.sideCategory,
      sideCategoryActiveIndex: state => state.sideCategoryActiveIndex
    }),
  },
  watch:{
    // 选中的时候更新
      selectIndex(newVal) {
        this.doConvert(newVal)
      },
      // 初始化的时候更新
      sideCategoryActiveIndex(newVal) {
        this.doConvert(newVal)
      }
  },
  methods: {
    doConvert(i) {
        if(i) {
          this.convertToBreadnav(i)
        }else {
          this.breadNav = []
        }
    },
    // 转换成名称
    convertToBreadnav(i) {
      if(!i) return ''
      const index  = i.split('-')
      let arr = []

      // 转译为名称
      index.reduce((pre, cur) => {
        const list = pre.children
        arr.push(pre.label)
        if(!list.length) return
        return list[cur]
      }, this.sideCategory.children[index[0]])

      this.breadNav = arr
    },
  }
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

