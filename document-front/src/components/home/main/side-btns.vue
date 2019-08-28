<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" plain circle class="fe-button-edit" @click="switchFn"></el-button>
    <fe-history></fe-history>
    <el-button type="danger" icon="el-icon-delete" plain circle class="fe-button-delete" @click="showDialog"></el-button>
  </div>
</template>
<script>
import feHistory from './history.vue'
import { articleDelete } from '@/assets/js/api'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  components:{
    feHistory
  },
  computed:{
    ...mapState({
      articleId: state => state.articleId,
      isLogin: state => state.isLogin,
    })
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    ...mapActions([
      'getSecondListFn',
    ]),
    showDialog() {
      this.$confirm('确定要删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.deleteFn()
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
    },
    deleteFn() {
      if(!this.isLogin) {
        this.$router.push('/login')
        return 
      }

      articleDelete({
        id: this.articleId
      }).then(({ success, msg })=>{
        if(success) {
          this.$message('删除成功');
          // todo:然后展示切换到上一篇
          
          window.location.reload()
        } else {
          this.$message.error(msg || '删除失败');
        }
      })
    },
    switchFn() {
      if(!this.isLogin) {
        this.$router.push('/login')
      }else {
        this.updateData({
          switchEditor: true
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
button[class*="fe-"] {
  position: fixed;
  // bottom: 80px;
  right: 20px;
  z-index: 1999;
}
.fe-button-edit {
  bottom: 80px;
}
.fe-history {
  position: fixed;
  right: 20px;
  z-index: 1999;
  bottom: 140px;
}
.fe-button-delete {
  bottom: 20px;
}
</style>

