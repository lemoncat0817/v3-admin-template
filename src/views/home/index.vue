<template>
  <div>
    <el-card style="height: 150px;">
      <div class="box">
        <el-image :src="userStore.avatar" style="border-radius: 50%; width: 100px; height: 100px;" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}呀{{ userStore.username }}</h3>
          <p class="subTitle">硅谷甄選運營平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <svg-icon name="welcome" width="600px" :height="`calc(100vh - 150px)`"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      margin-bottom: 20px;
      font-weight: bolder;
    }

    .subTitle {
      font-style: italic;
      font-weight: bold;
      font-size: 20px;
      color: #d2d1d1;
    }
  }
}

.bottoms {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
