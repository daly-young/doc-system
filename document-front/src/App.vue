<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,body, .el-container {
  height: 100%;
  background-color: #fff;
}
body>.el-container {
  padding-top: 60px;
  // width: 1140px;
  // margin: 0 auto;
}
.layout {
  width: 1140px !important;
  margin: 0 auto;
}

.fe-cascader{
  z-index: 99999 !important;
}
</style>
