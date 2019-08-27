<template id="item-template">
  <div>
    <el-submenu 
      v-if="isFolder" 
      :index="index" 
      :popper-append-to-body="true">
      <template slot="title">{{ item.title }}</template>
      <tree-menus
        class="item"
        v-for="(child, i) in item.list"
        :key="child.id"
        :item="child"
        :index="index+'-'+ i"
      ></tree-menus>
    </el-submenu >
    <el-menu-item 
      v-else
      :index="index"
      @click="getArticle">
      {{ item.title }}
    </el-menu-item >
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'treeMenus',
  props:{
    item: Object,
    index: String
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder () {
      return this.item.list &&
        this.item.list.length
    }
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    getArticle() {
      this.updateData({
        artcileId: this.item.article_id
      })
      this.$store.dispatch('getArticle')
    },
  }
}
</script>




