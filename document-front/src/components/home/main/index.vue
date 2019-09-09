<template>
  <el-main>
    <bread-nav></bread-nav>
    <normal v-if="!switchEditor"></normal>
    <edit v-else></edit>
    <!-- 只有常规展示以及可获取的文章可以展示 -->
    <side-btns v-if="!switchEditor"></side-btns>
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
      switchEditor: state => state.switchEditor,
      articleDetails: state => state.articleDetails
    } )
  }
}
</script>

