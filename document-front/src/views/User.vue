<template>
<el-container class="user">
  <!-- 头部 -->
  <user-header></user-header>
  <el-container class="user__bd">
    <!-- 侧边栏 -->
    <user-aside></user-aside>
    <el-container class="user__content">
      <!-- 信息记录表格 -->
      <user-list></user-list>
      <!-- 翻页板 -->
      <user-pagination></user-pagination>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import userHeader from '@/components/user/header.vue'
import userAside from '@/components/user/aside.vue'
import userList from '@/components/user/list.vue'
import userPagination from '@/components/user/pagination.vue'
export default {
  name: 'user',
  components:{
    userHeader,
    userAside,
    userList,
    userPagination,
  },
  data(){
    return {}
  },
  created() {},
  methods:{}
}
</script>
<style lang="scss">
.user {
  padding-top: 160px!important;
  &__bd {
    flex-wrap: nowrap;
    background-color: #E9EEF3;
  }
  &__content {
    flex-wrap: wrap;
  }
}
</style>
