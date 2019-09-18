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
    return {
      headerList: [{
        label: '文章',
        value: 'article',
        width: 500
      }, {
        label: '日期',
        value: 'date',
        width: 300
      }]
    }
  },
  computed: {
    ...mapState( {
      // headerList: state => state.user.tableHeader,
      // list: state => state
      user: state => state.user
    } ),
    activeIndex() {
      return this.user.activeIndex
    },
    list () {
      return this.user.tableList
    },
  },
  watch: {
    activeIndex( newVal ) {
      console.log( newVal, '======user.activeIndex' )
      this.changeTable( newVal )
      this.$store.dispatch( 'getUserHistory' )
    },
    list( newVal ) {
      console.log( newVal, '===user.list' )
    }
  },
  methods: {
    changeTable( i ) {
      let ids = [1, 2]
      this.headerList = [{
          label: '文章',
          value: 'article',
          width: 500
        }, {
          label: '日期',
          value: 'date',
          width: 300
        }]
      if ( ids.includes( i ) ) {
        this.headerList.push( {
          label: '操作',
          value: 'operation',
          width: 200
        } )
      }
    }
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
