<template>
  <el-button type="primary" size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button type="primary" size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主題設置" :width="300" trigger="hover">
    <el-form>
      <el-form-item label="主題顏色">
        <el-color-picker :teleported="false" @change="setColor" v-model="LayOutSettingStore.color" size="small"
          show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="LayOutSettingStore.dark" size="default" inline-prompt
          active-icon="MoonNight" inactive-icon="Sunny" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button type="primary" size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <img :src="userStore.avatar" alt="" style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50px" />
  <!-- 下拉菜單 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLayOutSettingStore } from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const LayOutSettingStore = useLayOutSettingStore()


const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}

const fullScreen = () => {
  const full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = async () => {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}

const setColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', LayOutSettingStore.color)
}

const changeDark = () => {
  const html: any = document.documentElement
  LayOutSettingStore.dark ? (html.className = 'dark') : (html.className = '')
}

onMounted(() => {
  changeDark()
  setColor()
})

</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
