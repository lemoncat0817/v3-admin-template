<template>
  <div class="layout_container">
    <!-- 左側菜單 -->
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜單 -->
      <!-- 滾動組件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜單組件 -->
        <el-menu :collapse="LayOutSettingStore.fold" :default-active="route.path" background-color="#001529"
          text-color="white" active-text-color="yellowgreen">
          <!-- 根據數據改變菜單內容 -->
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 頂部導航 -->
    <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold }">
      <Tabbar />
    </div>
    <!-- 內容展示區域 -->
    <div class="layout_main" :class="{ fold: LayOutSettingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Menu from './menu/index.vue'
import Logo from './logo/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import { useLayOutSettingStore } from '@/store/modules/setting'
const LayOutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()
const route = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bg;
    transition: all 0.3s;

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
