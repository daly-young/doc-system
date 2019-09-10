<template>
  <el-main>
    <bread-nav></bread-nav>
    <template v-if="isNormal">
      <normal></normal>
      <side-btns></side-btns>
    </template>
    <edit v-else></edit>
    <!-- 只有常规展示以及可获取的文章可以展示 -->
  </el-main>
</template>
<script>
import breadNav from './breadnav'
import normal from './normal'
import edit from './edit'
import sideBtns from './side-btns'
import { mapState } from 'vuex';

export default {
  components: {
    normal,
    edit,
    breadNav,
    sideBtns
  },
  computed: {
    ...mapState( {
      article: state => state.article,
    } ),
    isNormal() {
      return !this.article.isEdit
    }
  }
}
</script>

