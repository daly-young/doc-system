<template>
  <div class="search">
    <!-- <el-table
    :data="tableData"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="article_name"
      label="文章"
      width="400">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="400">
    </el-table-column>
    <el-table-column
      prop="modify_time"
      label="日期"
      width="400">
    </el-table-column>
  </el-table> -->
    <dl v-if="list.length">
      <dt>搜索结果：</dt>
      <dd v-for="item in list" :key="item.id" @click="toIndex(item)">
        <h5>{{item.article_name}}</h5>
        <div v-html="formatContent(item.content)"></div>
        <p>{{item.modify_time}}</p>
      </dd>
    </dl>
    <p v-else> 暂无相关内容 </p>
  </div>
</template>

<script>
import { searchAll } from '@/assets/js/api'
import { mapState } from 'vuex'

export default {
  name:'',
  data () {
    return {
      keywords: this.$route.query.keywords,
      list: [],
      flattenCateList: []
    }
  },
  components: {},
  computed: {
    ...mapState( {
      // tree: state => state.tree,
      menu: state => state.menu,
    } ),
    menuList: {
      get(){
        return this.menu.menuList
      },
      set ( val ) {
        console.log( val, '=====set val' )
        return val
      }
    }
  },
  created() {
    this.init()
  },
  beforeMount() {},
  mounted() {},
  methods: {
    init() {
      searchAll( {
        keywords:  this.keywords
      } ).then( ( data )=>{
        this.list = data.result
      } )
      // console.log( this.menuList, this.menuList.length, '===search menuList' )
      // if( this.menuList.length ) {
      //   this.flatCate( this.menuList )
      // } else {
      //   this.getCate()
      // }
    },
    // getCate() {
    //   getMenu().then( ( { success, result, msg } ) => {
    //     if ( success ) {
    //       this.menuList = result
    //       console.log( this.menuList, '======getCate' )
    //       this.flatCate( result )
    //     } else {
    //       this.$message.error( msg );
    //     }
    //   } )
    // },
    // flatCate( arr ) {
    //   this.flattenCateList = this.flatten( arr )
    //   console.log( this.flatten( arr ), '=====search flatten menuList' )
    // },
    // flatten( data, level = 0 ) {
    //   return data.reduce( ( prev, {children = [], ...rest} )=> {
    //       return [
    //           ...prev,
    //           {
    //               ...rest
    //           },
    //           ...this.flatten( children, level + 1 )
    //       ]
    //   }, [] )
    // },
    formatContent( content ) {
      return content.replace( /<[^<>]+>/g, '  ' ).replace( this.keywords, `<span style="font-weight:bold;font-size:18px;"> ${this.keywords} </span>` )
    },
    toIndex( item ) {
      // const menuOrTree = parentId == 0 ? 'menu' : 'tree'
      // const obj = this.flattenCateList.filter( ( item )=>item.id == levelId )[0]
      // console.log( obj, '======item' )
      sessionStorage.setItem( 'dalydoc_search', JSON.stringify( item ) )
      location.href = '/'
    }
  },
  watch: {}
}

</script>
<style lang='scss' scoped>
.search {
  width: 1200px;
  margin: 0 auto;
  &>p {
    font-size: 30px;
    text-align: center;
    line-height: 100px;
  }
  dl {
    dt {
      font-size: 24px;
      font-weight: bold;
      line-height: 60px;
    }

    dd {
      box-shadow: #ccc 0 0 10px;
      border-radius:4px;
      margin-bottom: 20px;
      padding: 0 10px;
      cursor: pointer;
      h5 {
        font-size: 20px;
        line-height: 50px;
      }
      div {
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
        * {
          font-size: 14px!important;
        }
      }
      p {
        font-size: 14px;
        color: #666;
        line-height: 30px;
      }
    }
  }
}
</style>