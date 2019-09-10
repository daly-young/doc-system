<template>
<el-container class="layout">
  <fe-header></fe-header>
  <el-container>
    <fe-aside></fe-aside>
    <el-container>
      <fe-main></fe-main>
    </el-container>
  </el-container>
  <fe-create v-if="article.createShow"></fe-create>
</el-container>
</template>

<script>
import feHeader from '@/components/home/header.vue'
import feAside from '@/components/home/aside'
import feMain from '@/components/home/main'
import feCreate from '@/components/home/create.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    feHeader,
    feAside,
    feMain,
    feCreate
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch( 'getCateListFn' )
  },
  computed:{
    ...mapState( {
      // switchEditor: state => state.switchEditor,
      article: state => state.article,
      // sideCategory: state => state.sideCategory
    } ),
    // showAsideMenu() {
    //   let { sideCategory } = this
    //   return sideCategory && sideCategory.children && sideCategory.children.length
    // }
  },
  methods:{
    ...mapActions( [
      'getCateListFn',
    ] ),
  }
}
</script>
<style lang="scss" scoped>
// test
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.el-header, .el-footer {
  background-color: #fff;
  color: #409EFF;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #eee;
}

.el-aside {
  background-color: #fff;
  text-align: center;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>

