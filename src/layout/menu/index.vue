<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 沒有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一個 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且個數大於1 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
      @click="goRoute"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 獲取父組件傳遞過來的全部路由數組
defineProps(['menuList'])

const goRoute = (vc: any) => {
  // 跳轉路由
  router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
