<template>
  <el-footer>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="total"
        hide-on-single-page>
      </el-pagination>
    </div>
  </el-footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'userPagination',
  data(){
    return {
    }
  },
  computed: {
    ...mapState({
      total: state => state.user.paginationTotal,
      currentPage: state => state.user.currentPage,
    })
  },
  created() {
  },
  methods:{
    handleCurrentChange(page) {
      console.log(page,'====currentPage')
      // this.updateUser({
      //   activeIndex: i
      // })
      // this.updateUserAside()
      this.$store.dispatch('getUserHistory',{
        start: (page-1)*12,
        size:12,
      })
    },
  }
}
</script>
<style lang="scss" scoped>
 .el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
}
</style>