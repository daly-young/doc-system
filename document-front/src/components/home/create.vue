<template>
  <div class="fe-create">
    <i class="el-icon-circle-close" @click="closeFn"></i>
    <div class="fe-create-content" v-if="options.length">
       <!-- new -->
      <div class="fe-create-input">
        <span>选择路径：</span>
        <el-cascader
          v-model="defaultIds"
          :options="options"
          :props="props"
          @change="handleChange"></el-cascader>
      </div>
      <div class="fe-create-input">
        <span>新增文件夹</span>
        <el-input
          placeholder="如需增加新层级，在此填写，可添加多级，例：新文件夹/新文件夹/"
          v-model="newFolder">
        </el-input>
      </div>
      <div class="fe-create-input">
        <span>文章名称：</span>
        <el-input
          placeholder="请填写文章标题，可不填，只创建文件夹"
          v-model="articleTitle">
        </el-input>
      </div>
      <el-button type="primary" @click="createFn">创建</el-button>
    </div>
   
  </div>
</template>
<script>
import { articleCreate, getFolders } from '@/assets/js/api'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      articleTitle:'', // 新建文章名称
      value: [4, 8], // 级联选择器选择路径
      props: {
        checkStrictly: true
      },
      options: [],
      newFolder: '',
      pathArr: [], // 文章路径信息
    }
  },
  computed:{
    ...mapState( {
      // sideCategory: state => state.sideCategory,
      selectItemIdList: state => state.selectItemIdList,
    } ),
    defaultIds: {
      get() {
        return this.selectItemIdList
      },
      set( val ) {
        return val
      }
    }
  },
  created() {
    this.init()
  },
  mounted(){},
  methods:{
    ...mapMutations( [
      'updateData',
    ] ),
    init() {
      // 获取所有文件夹
      getFolders().then( ( {success, result} )=>{
        if( success ) {
          this.options = result
        }
      } )
    },
    // 选择路径信息展示
    handleChange( value ) {
      console.log( value, '======' )
      this.defaultIds = value
    },
    createFn() {
      // 没有文章不创建
      if( !( this.articleTitle || this.newFolder ) ) {
        this.$message.error( '请填写创建文件夹名称或者文章名称' );
        return
      }

      // 数组=》去空=》转字符串
      const folders = this.newFolder.split( '/' ).filter( Boolean ).join( ',' )
      const parentId = this.defaultIds[this.defaultIds.length - 1]
      articleCreate( {
        parentId,
        folders,
        articleTitle: this.articleTitle,
      } ).then( ( {success, result, msg} )=>{
        if( success ) {
          // 关闭创建面板=》修改默认id序列=》提交生成文章的ID=》调出编辑面板
          this.updateData( {
            createShow: false,
            switchEditor: true,
            articleId: result.id,
          } )
        } else {
            this.$message.error( msg || '创建失败' );
        }
      } )
    },
    closeFn() {
      this.updateData( {
        createShow: false,
      } )
    },
    siwtchFn() {
      this.toCreate = !this.toCreate
      this.selectObj = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.fe-create {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,.4);
  z-index: 1999;
  .el-icon-circle-close {
    position: fixed;
    top: 20%;
    right: 18%;
    font-size: 40px;
    color: #fff;

  }
  &-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    width: 60%;
    min-height: 400px;
    border-radius: 4px;
    padding: 20px;
    .el-input {
      width: 50%!important;
      margin-right: 20px;
    }
  }
  &-input {
    margin-bottom: 20px;
    span:first-child {
      display: inline-block;
      width: 160px;
    }
    .el-input {
      width: 70%!important;
      margin-right: 20px;
    }
    .el-cascader {
      width: 70%;
      margin-right: 20px;
    }
  }
  // .el-breadcrumb {
  //   display: inline-block;
  //   padding: 0 10px;
  //   height: 40px;
  //   line-height: 40px;
  //   border-radius: 4px;
  //   border: 1px solid #ccc;
  // }
  .el-button {
    display: block;
    width: 70%;
    margin: 0 auto;
  }
}
</style>



