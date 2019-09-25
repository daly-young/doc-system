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
  <!-- <fe-footer></fe-footer> -->
</el-container>
</template>

<script>
import feHeader from '@/components/home/header.vue'
import feAside from '@/components/home/aside.vue'
import feMain from '@/components/home/main'
import feCreate from '@/components/home/create.vue'
// import feFooter from '@/components/home/footer.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    feHeader,
    feAside,
    feMain,
    feCreate,
    // feFooter
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch( 'getMenuFn' )
  },
  computed:{
    ...mapState( {
      article: state => state.article,
    } ),
  },
  methods:{
    ...mapActions( [
      'getMenuFn',
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

