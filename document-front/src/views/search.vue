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
    <dl>
      <dt>搜索结果：</dt>
      <dd v-for="item in list" :key="item.id" @click="toIndex(item)">
        <h5>{{item.article_name}}</h5>
        <div v-html="formatContent(item.content)"></div>
        <p>{{item.modify_time}}</p>
      </dd>
    </dl>
  </div>
</template>

<script>
import { searchAll} from '@/assets/js/api'

export default {
  name:'',
  data () {
    return {
      keywords: this.$route.query.keywords,
      list: []
    }
  },
  components: {},
  computed: {},
  created() {
    searchAll( {
      keywords:  this.keywords
    } ).then( ( data )=>{
      this.list = data.result
    } )
  },
  beforeMount() {},
  mounted() {},
  methods: {
    formatContent( content ) {
      return content.replace( /<[^<>]+>/g, '  ' ).replace( this.keywords, `<span style="font-weight:bold;font-size:18px;"> ${this.keywords} </span>` )
    },
    toIndex( {levelId, parentId} ) {
      const menuOrTree = parentId == 0 ? 'menu' : 'tree'
      location.href = `/?levelId=${levelId}&cate=${menuOrTree}`
    }
  },
  watch: {}
}

</script>
<style lang='scss' scoped>
.search {
  width: 1200px;
  margin: 0 auto;
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