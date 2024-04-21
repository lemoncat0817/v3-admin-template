<template>
  <!-- 頂部左側靜態 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左側麵包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.icon"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon" v-if="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useLayOutSettingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
const route = useRoute()
const LayOutSettingStore = useLayOutSettingStore()

const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
