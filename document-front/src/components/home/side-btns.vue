<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" plain circle class="fe-button-edit" @click="switchFn"></el-button>
    <fe-history></fe-history>
    <el-button type="danger" icon="el-icon-delete" plain circle class="fe-button-delete" @click="deleteFn"></el-button>
  </div>
</template>
<script>
import feHistory from '@/components/home/history.vue'
import { articleDelete } from '@/assets/js/api'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  components:{
    feHistory
  },
  computed:{
    ...mapState({
      curId: state => state.curId
    })
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    ...mapActions([
      'getSecondListFn',
    ]),
    deleteFn() {
      articleDelete({
        id: this.curId
      }).then(({ success, msg })=>{
        if(success) {
          this.$message('删除成功');
          // todo:然后展示切换到上一篇
          // this.curId = 
          this.$store.dispatch('getSecondListFn')
        } else {
          this.$message.error(msg || '删除失败');
        }
      })
    },
    switchFn() {
      this.updateData({
        switchEditor: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
button[class*="fe-"] {
  position: fixed;
  // bottom: 80px;
  right: 20px;
  z-index: 2000;
}
.fe-button-edit {
  bottom: 80px;
}
.fe-history {
  position: fixed;
  right: 20px;
  z-index: 2000;
  bottom: 140px;
}
.fe-button-delete {
  bottom: 20px;
}
</style>

