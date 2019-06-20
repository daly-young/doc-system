<template>
<el-container class="layout">
  <fe-header></fe-header>
  <el-container>
    <fe-aside></fe-aside>
    <el-container>
      <fe-main v-if="switchEditor"></fe-main>
      <fe-main1 v-else></fe-main1>
      <fe-sidebtns v-if="!switchEditor"></fe-sidebtns>
    </el-container>
  </el-container>
  <fe-create v-if="createShow"></fe-create>
</el-container>
</template>

<script>
import feHeader from '@/components/home/header.vue'
import feAside from '@/components/home/aside.vue'
import feMain from '@/components/home/main.vue'
import feMain1 from '@/components/home/main-preview.vue'
import feSidebtns from '@/components/home/side-btns.vue'
import feCreate from '@/components/home/create.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    feHeader,
    feAside,
    feMain,
    feMain1,
    feSidebtns,
    feCreate
  },
  data() {
    return {}
  },
  computed:{
    ...mapState({
      switchEditor: state => state.switchEditor,
      createShow: state => state.createShow,
    })
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
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>

