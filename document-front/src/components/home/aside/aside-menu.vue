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
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
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
    getArticle() {
      this.$emit('getArtcile', this.item)
    }
  }
}
</script>




