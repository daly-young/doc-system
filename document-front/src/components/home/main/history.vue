// todo: 区分”今天“”昨天“
<template>
  <el-popover
    class="fe-history"
    placement="left"
    width="400"
    trigger="manual"
    v-model="visible">
    <el-table :data="gridData">
      <el-table-column width="200" property="user_name" label="姓名"></el-table-column>
      <el-table-column width="200" property="modify_time" label="日期"></el-table-column>
      <!-- <el-table-column width="300" property="address" label="地址"></el-table-column> -->
    </el-table>
    <el-button slot="reference" icon="el-icon-notebook-2" type="primary" plain circle  @click="popShow"></el-button>
  </el-popover>
</template>
<script>
import { mapState } from 'vuex'
import { getHistory } from '@/assets/js/api'

export default {
  prop:{
    list:{
      type: Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      switchEditor: false,
      gridData: [],
      visible: false
    }
  },
  computed:{
    ...mapState( {
       articleId: state => state.articleId,
    } )
  },
  watch:{
    articleId( newVal ) {
      if( newVal ) {
        this.visible = false
      }
    }
  },
  methods:{
    popShow() {
      this.visible = !this.visible
      this.visible && this.getData()
    },
    getData() {
      if( !this.articleId ) {
        this.gridData = []
        return
      }
      getHistory( {
        id: this.articleId
      } ).then( ( {success, result, msg} )=>{
        if( success ){
          this.gridData = result
          this.visible = true
        } else {
          this.$message.error( msg || '获取失败' );
        }
      } )
    }
  }
}
</script>
<style lang="scss" scoped>
.fe-history {
  line-height: 40px;
}
</style>


