<template>
  <el-main>
    <mavon-editor v-model="value" @change="changeData"/>
    <el-button type="primary" @click="saveData">保存</el-button>
    <el-popover
      placement="top"
      width="160"
      v-model="cancelBoxShow">
      <p>确定不保存编辑内容吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancelBoxShow = false">取消</el-button>
        <el-button size="mini" type="primary" @click="cancelFn">确定</el-button>
      </div>
      <el-button slot="reference" type="info" plain>取消</el-button>
    </el-popover>
  </el-main>
</template>

<script>
import { articleUpdate } from '@/assets/js/api'
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'feMain',
  props: {
  },
  data(){
    return {
      render:'',
      cancelBoxShow: false,
      value: ''
    }
  },
  computed:{
    ...mapState({
      curId: state => state.curId,
      curItem: state => state.curItem,
    })
  },
  created() {
    this.value = this.curItem.md || ''
  },
  methods:{
    ...mapMutations([
      'updateData',
    ]),
    saveData() {
      // todo:通知修改展示状态
      articleUpdate({
        id: this.curId,
        content: this.render,
        md: this.value
      }).then(({ success })=>{
        success && this.cancelFn()
      })
    },
    changeData(value, render) {
        this.render = render
    },
    cancelFn() {
      this.updateData({
        switchEditor: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-body {
  height: 80%;
}
</style>
