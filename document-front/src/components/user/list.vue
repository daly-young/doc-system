<template>
  <el-main>
    <el-table
      :data="list"
      height="100%">
      <el-table-column
        v-for="(item,index) in headerList"
        :prop="item.value"
        :label="item.label"
        :key="index"
        :width="item.width">
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'userList',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      headerList: state => state.user.tableHeader,
      list: state => state.user.tableList,
    })
  }
}
</script>
<style lang="scss" scoped>
.el-main {
  height: 100%;
  overflow-y: auto;
}
.el-table__header {
  width: 100%!important;
}
.el-table::before {
  display: none;
}
</style>
